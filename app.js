const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mount `/middlewares`
app.get("/error.js", require("./middlewares/errorJS"));
app.get("/record.js", require("./middlewares/recordJS"));
app.post("/error", require("./middlewares/error"));
app.all("/record", require("./middlewares/record"));
app.get("/", require("./middlewares/indexHTML"));

// mount `/routes`
// app.use("/admin", require("./routes/admin"));
app.all("/query", require("./middlewares/query"));
//? This is for prototype versions

module.exports = app;
