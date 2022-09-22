const CONFIG = require("../config");
module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // const html = require("fs").readFileSync(require("path/posix").resolve() + "/test/server.html", "utf-8");
    // res.send(html);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(
        `Usage:
<script type="text/javascript" async src="${CONFIG.host}record.js" crossorigin></script>
<script type="text/javascript" async src="${CONFIG.host}error.js" crossorigin></script>`
    );
};
