const CONFIG = require("../config.js");
const ENDPOINT = (CONFIG.host.endsWith("/") ? CONFIG.host : CONFIG.host + "/") + "record";
module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(
        `(function () {
    var s = "${ENDPOINT}";
    var e = { url: location.href, ref: document.referrer, lang: navigator.language };
    var x = new XMLHttpRequest();
    x.open("POST", s, true);
    x.setRequestHeader("Content-type", "application/json; charset=utf-8");
    x.send(JSON.stringify(e));
})();
`
    );
};
