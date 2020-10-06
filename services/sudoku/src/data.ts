import { connect as _connnect, connection, Connection, Schema, model, disconnect as _disconnect } from "mongoose";
let database: Connection;

const PazzleSchema = new Schema();
const Pazzle = model('pazzles', PazzleSchema, "pazzles");

export const connect = () => {
  // add your own uri below
  const uri = "mongodb://localhost:27017/sudoku";
  if (database) {
    return;
  }
  _connnect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  _disconnect();
};


export const getPazzleById = async (id: any) => {
  const res = await Pazzle.find({ id: +id }).exec();

  var x = await Pazzle.countDocuments();

  return res
}