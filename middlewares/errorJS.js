const CONFIG = require("../config.js");
const ENDPOINT = (CONFIG.host.endsWith("/") ? CONFIG.host : CONFIG.host + "/") + "error";


module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(
        `window.onerror = function (msg, src, lineno, colno, error) {
    var s = "${ENDPOINT}";
    var e = { src: src, error: { name: error.name, message: error.message, stack: error.stack } };
    var x = new XMLHttpRequest();
    x.open("POST", s, true);
    x.setRequestHeader("Content-type", "application/json; charset=utf-8");
    x.send(JSON.stringify(e));
};`
    );
};
