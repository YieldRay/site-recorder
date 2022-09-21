const { MongoClient, ServerApiVersion } = require("mongodb");
const CONFIG = require("../config");

function getTime(year, month, day) {
    if (arguments.length === 0) return Date.now();
    if (month <= 0) throw new Error(`Month ranges from 1-12, got ${month}`);
    return new Date(year, month + 1, day).getTime();
}

const client = new MongoClient(CONFIG.mongoDB.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

module.exports = {
    client,
    insertTo(dbName, collectionName) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        return {
            withData(data) {
                return collection.insertOne(data);
            },
        };
    },
    findAt(dbName, collectionName) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        return {
            async match(dateFrom = [2022, 1, 1], dateTo = [2999, 1, 1], page = 1, lenPerPage = 50) {
                const cursor = collection.find({
                    date: {
                        $gte: getTime(...dateFrom),
                        $lt: getTime(...dateTo),
                    },
                });
                const amount = await collection.countDocuments();
                const data = await cursor
                    .sort({ date: -1 })
                    .skip((page - 1) * lenPerPage)
                    .limit(lenPerPage)
                    .toArray();
                return {
                    amount,
                    data,
                };
            },
        };
    },
    async getAllCollectionNames(dbName = CONFIG.mongoDB.dbNames.record) {
        const db = client.db(dbName);
        const cols = await db.collections();
        return cols.map((col) => col.collectionName);
    },
    async quicklyPreview(dbName = CONFIG.mongoDB.dbNames.record) {
        //? This is for prototype version & test
        const colNames = await this.getAllCollectionNames(dbName);
        const result = {};
        for (const colName of colNames) {
            result[colName] = (await this.findAt(dbName, colName).match()).data;
        }
        return result;
    },

    async getPassword() {
        const db = client.db(CONFIG.mongoDB.dbNames.admin);
        const collection = db.collection(CONFIG.mongoDB.dbNames.admin);
        const query = { _id: "password" };
        const result = await collection.findOne(query);
        return result.value;
    },
    async setPassword(encryptedPassword) {
        const db = client.db(CONFIG.mongoDB.dbNames.admin);
        const collection = db.collection(CONFIG.mongoDB.dbNames.admin);
        const query = { _id: "password" };
        const update = { $set: { value: encryptedPassword } };
        const options = { upsert: true };
        const result = await collection.updateOne(query, update, options);
        return result.acknowledged;
    },
    async assignToken(expireIn = 7, permitions = ["localhost:8080"]) {
        const db = client.db(CONFIG.mongoDB.dbNames.admin);
        const collection = db.collection("tokens");
        const { nanoid } = await import("nanoid");
        const token = nanoid();
        const date = Date.now();
        await collection.insertOne({
            token,
            date,
            expireDate: date + expireIn * 1000 * 60 * 60 * 24,
            permitions,
        });
        return token;
    },
    async getPermitions(token) {
        const db = client.db(CONFIG.mongoDB.dbNames.admin);
        const collection = db.collection("tokens");
        const doc = await collection.findOne({ token });
        if (Date.now() < doc.expireDate) return doc.permitions;
        else collection.deleteOne({ token });
        return [];
    },
    destroyToken(token) {
        const db = client.db(CONFIG.mongoDB.dbNames.admin);
        const collection = db.collection("tokens");
        return collection.deleteOne({ token });
    },
};
