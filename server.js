const app = require("./index");
const CONFIG = require("./config");
console.log(`server listen at http://localhost:${CONFIG.port}`);
app.listen(CONFIG.port);
