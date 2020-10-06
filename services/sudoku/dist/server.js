"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const logger_1 = __importDefault(require("./logger"));
const sudokutouch_1 = require("./sudokutouch");
//import { connect } from "./data";
const app = express_1.default();
const port = yargs_1.argv.port || 4004;
app.use(cors_1.default());
const auth = express_jwt_1.default({ secret: 'kd3r9HYfBvPKDa6c5YGhpFnwLDpxdT8Ka8Mne8pYaU4aEE5zVk6fLqL8exb3gdEJ', algorithms: ['HS256'] });
//app.use(jwt({ secret: 'kd3r9HYfBvPKDa6c5YGhpFnwLDpxdT8Ka8Mne8pYaU4aEE5zVk6fLqL8exb3gdEJ', algorithms: ['HS256'] }))
app.get("/api/pazzle/:num", (r, s) => __awaiter(void 0, void 0, void 0, function* () {
    const num = r.params.num || "513165662";
    const pazzle = yield sudokutouch_1.getPazzleById(num);
    s.json(pazzle);
}));
app.get("/api/pazzle", (r, s) => __awaiter(void 0, void 0, void 0, function* () {
    const pazzle = yield sudokutouch_1.getPazzle();
    s.json(pazzle);
}));
app.get("/api/user", auth, (req, res) => {
    const user = req.user;
    res.send(user);
});
app.get("/api", (_, res) => {
    res.send("sudoku api");
});
app.listen(port, () => {
    //connect();
    logger_1.default.info("starting server on port " + port);
});
//# sourceMappingURL=server.js.map