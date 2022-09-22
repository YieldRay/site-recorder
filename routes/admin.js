const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
const db = require("../db/index");
const CONFIG = require("../config");

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

/**
 * TOKEN
 */

router.use(async (req, res, next) => {
    const token = req.headers.authorization;
    const permitions = await db.getPermitions(token);
    req.permitions = permitions;
    next();
});
router.post("/permistions", (req, res) => {
    res.json(req.permitions);
});
router.post("/query", async (req, res) => {
    const target = req.body.query;
    const type = req.body.type;
    if (!req.permitions.includes("*") && !req.permitions.includes(target)) {
        res.json({ amount: 0, data: [] });
        return;
    }
    if (type === "error") {
        res.json(db.findAt(CONFIG.mongoDB.dbNames.error, target).match());
    } else {
        res.json(db.findAt(CONFIG.mongoDB.dbNames.record, target).match());
    }
});

module.exports = router;
