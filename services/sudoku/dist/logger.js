"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, printf } = winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston_1.createLogger({
    format: combine(label({ label: "sudoku" }), timestamp(), myFormat),
    transports: [new winston_1.transports.Console()]
});
exports.default = logger;
//# sourceMappingURL=logger.js.map