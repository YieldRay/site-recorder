const CONFIG = require("../config.js");
const ENDPOINT = (CONFIG.host.endsWith("/") ? CONFIG.host : CONFIG.host + "/") + "error";

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/javascript");
    res.setHeader("Cache-Control", "max-age=86400");
    res.send(
        `window.onerror = function (msg, src, lineno, colno, error) {
    var s = "${ENDPOINT}";
    var e = { url: location.href, src: src, error: { name: error.name, message: error.message, stack: error.stack } };
    var x = new XMLHttpRequest();
    x.open("POST", s, true);
    x.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    x.send(JSON.stringify(e));
};`
    );
};
