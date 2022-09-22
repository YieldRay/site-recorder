const db = require("../db/index");
const CONFIG = require("../config");

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.send();

    // const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const { referer } = req.headers;
    if (!referer) return;
    let url = referer;
    let u1;
    try {
        u1 = new URL(referer);
        const u2 = new URL(req.body.url);
        if (u1.host !== u2.host) return;
        url = req.body.url; // to get a more preciser value
    } catch {
        if (!u1.host) return;
    }

    db.insertTo(CONFIG.mongoDB.dbNames.record, u1.host).withData({
        date: Date.now(),
        url,
        referer: req.body.ref,
        lang: req.body.lang,
        ua: req.headers["user-agent"],
        ip: req.IP,
    });
};
