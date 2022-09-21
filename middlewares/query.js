const db = require("../db/index");
const CONFIG = require("../config");
module.exports = async (req, res) => {
    // const auth = req.body.pwd;
    // if (!auth) {
    //     res.json({ success: false });
    //     return;
    // }
    // const pwd = await db.getPassword();
    // if (pwd !== auth) {
    //     res.json({ success: false });
    //     return;
    // }
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.body.pwd !== CONFIG.admin) {
        res.status(401);
        res.send("Unauthorized");
        return;
    }
    res.json(await db.quicklyPreview());
};
