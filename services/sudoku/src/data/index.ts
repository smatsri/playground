import { connect as _connnect, connection, Connection, Schema, model, disconnect as _disconnect } from "mongoose";
import { mongoConStr } from "../config";
let database: Connection;

export const connect = () => {
  const uri = mongoConStr;
  if (database) {
    return;
  }

  database = connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", (err) => {
    console.log("db failure");
  });

  _connnect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });



};

export const disconnect = () => {
  if (!database) {
    return;
  }
  _disconnect();
};