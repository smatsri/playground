"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./logger"));
const data_1 = require("./data");
const pazzles_1 = __importDefault(require("./pazzles"));
const user_data_1 = __importDefault(require("./user-data"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = yargs_1.argv.port || 80;
app.use(cors_1.default());
app.use(body_parser_1.default());
pazzles_1.default(app);
user_data_1.default(app);
app.get("/api/test", (_, res) => {
    res.send("ok");
});
app.listen(port, () => {
    data_1.connect();
    logger_1.default.info("starting server on port " + port);
});
//# sourceMappingURL=server.js.map