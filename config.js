module.exports = {
    port: process.env.PORT || 8080,
    host: process.env.HOST || `https://${process.env.DETA_PATH}.deta.dev/` || "http://localhost:8080/",
    mongoDB: {
        uri: process.env.MONGO_URI,
        dbNames: {
            record: process.env.NAME_FOR_RECORD || "siteRecord",
            error: process.env.NAME_FOR_ERROR || "siteError",
            admin: process.env.NAME_FOR_ADMIN || "siteAdmin",
        },
    },
    admin: process.env.ADMIN || "pa$$w0rd",
};
