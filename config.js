module.exports = {
    port: process.env.port || 8080,
    host: process.env.host || `http://localhost:8080/`, //! endsWith `/`
    mongoDB: {
        uri: process.env.mongo_uri,
        dbNames: {
            record: process.env.name_for_record || "siteRecord",
            error: process.env.name_for_error || "siteError",
            admin: process.env.name_for_admin || "siteAdmin",
        },
    },
    admin: process.env.admin || "pa$$w0rd",
};
