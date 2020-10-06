"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const url = 'mongodb://localhost:27017';
const dbName = 'sodoku';
let db = null;
mongodb_1.MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to server");
    db = client.db(dbName);
    client.close();
});
exports.getPazzle = (id) => {
    return db.collection('pazzles').findOne({ id });
};
//# sourceMappingURL=db.js.map