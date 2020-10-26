import { connect as _connnect, connection, Connection, Schema, model, disconnect as _disconnect } from "mongoose";
let database: Connection;



export const connect = () => {
  // add your own uri below
  const uri = "mongodb://root:example@localhost:27017/sudoku-db?authSource=admin&readPreference=primary&ssl=false";
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