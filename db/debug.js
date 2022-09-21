module.exports = {
    insertTo(dbName, collectionName) {
        return {
            withData(data) {
                console.log({ dbName, collectionName, data });
            },
        };
    },
    findAt(dbName, collectionName) {
        return {
            async match() {
                console.error("NOT USEABLE IN DEBUG");
                return { amount: 0, data: [] };
            },
        };
    },
};
