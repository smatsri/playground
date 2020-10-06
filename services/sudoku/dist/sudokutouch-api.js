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
const node_html_parser_1 = require("node-html-parser");
const request_1 = __importDefault(require("request"));
const getFromOptions = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var [_, html] = yield requestAsync(req);
    const pazzle = parseHtml(html);
    return pazzle;
});
const requestAsync = (options) => new Promise((res, rej) => {
    request_1.default(options, (error, response, body) => {
        if (error) {
            rej(error);
        }
        else {
            res([response, body]);
        }
        ;
    });
});
const parseHtml = (body) => {
    const root = node_html_parser_1.parse(body);
    const cells = root.querySelectorAll(".tblcell");
    let input = [];
    for (const cell of cells) {
        let value = cell.innerHTML ? +cell.innerHTML : 0;
        input.push(value);
    }
    let id = +root.querySelector('#lvlss #ptitle').innerHTML.substring(1);
    let title = root.querySelector("#phead #ptitle").innerHTML;
    return ({ input, id, title });
};
exports.getPazzle = (level = 5) => {
    return getFromOptions({
        url: "http://www.sudokutouch.com/",
        headers: {
            Cookie: "level=" + level
        }
    });
};
exports.getPazzleById = (puzzleno = "513165662") => {
    return getFromOptions({
        url: "http://www.sudokutouch.com/",
        method: "POST",
        formData: {
            puzzleno
        }
    });
};
//# sourceMappingURL=sudokutouch-api.js.map