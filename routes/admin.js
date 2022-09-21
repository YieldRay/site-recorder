const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
const db = require("../db/index");

router.post("/login", async (req, res) => {
    const auth = req.body.pwd;
    if (!auth) {
        res.json({ success: false });
        return;
    }

    const pwd = await db.getPassword();
    if (pwd === auth) {
        const token = await db.assignToken(7, ["*"]);
        res.json({ success: true, token });
    } else {
        res.json({ success: false });
    }
});

router.post("/reset", async (req, res) => {
    const auth = req.body.pwd;
    const newPwd = req.body.newPwd;
    if (!(auth && newPwd)) {
        res.json({ success: false });
        return;
    }
    const pwd = await db.getPassword();
    if (pwd === auth) {
        res.json({ success: await db.setPassword(newPwd) });
    } else {
        res.json({ success: false });
    }
});

router.post("/query", async (req, res) => {
    const token = req.headers.authorization;
    const permitions = await db.getPermitions(token);
    //TODO
    res.json(permitions);
});

module.exports = router;
