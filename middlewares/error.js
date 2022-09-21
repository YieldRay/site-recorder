const db = require("../db/index");
const CONFIG = require("../config");

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send();

    const { referer } = req.headers;
    if (!referer) return;
    const u = new URL(referer);

    db.insertTo(CONFIG.mongoDB.dbNames.error, u.host).withData({
        date: Date.now(),
        src: req.body.src,
        error: req.body.error,
    });
};
