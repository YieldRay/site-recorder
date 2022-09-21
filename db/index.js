const CONFIG = require("../config");
let DB = require("./debug");
if (CONFIG.mongoDB.uri) DB = require("./mongodb");
module.exports = DB;
