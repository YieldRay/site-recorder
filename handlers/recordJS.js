const CONFIG = require("../config.js");
const ENDPOINT = (CONFIG.host.endsWith("/") ? CONFIG.host : CONFIG.host + "/") + "record";
module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/javascript");
    res.setHeader("Cache-Control", "max-age=86400");
    res.send(
        `(function () {
    var s = "${ENDPOINT}";
    var e = { url: location.href, ref: document.referrer, lang: navigator.language };
    var x = new XMLHttpRequest();
    x.open("POST", s, true);
    x.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    x.send(JSON.stringify(e));
})();
`
    );
};
