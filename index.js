const express = require("express");
const requestIp = require("request-ip");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestIp.mw({ attributeName: "IP" }));

// mount `/middlewares`
app.get("/error.js", require("./handlers/errorJS"));
app.options("/error", require("./handlers/OPTIONS"));
app.post("/error", require("./handlers/error"));
app.get("/record.js", require("./handlers/recordJS"));
app.options("/record", require("./handlers/OPTIONS"));
app.all("/record", require("./handlers/record"));
app.get("/", require("./handlers/indexHTML"));

// mount `/routes`
// app.use("/admin", require("./routes/admin"));
app.all("/query", require("./handlers/query"));
//? This is for prototype versions

module.exports = app;
