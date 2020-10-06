import { MongoClient, Db } from "mongodb";

const url = 'mongodb://localhost:27017';
const dbName = 'sodoku';

let db: Db = null;

MongoClient.connect(url, function (err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
  client.close();
});

export const getPazzle = (id: any) => {
  return db.collection('pazzles').findOne({ id });
}