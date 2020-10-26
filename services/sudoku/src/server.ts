import { argv } from "yargs";
import express from "express";
import cors from "cors";
import logger from "./logger";
import { connect } from "./data";
import pazzles from "./pazzles"
import userData from "./user-data"
import bodyParser from "body-parser"


const app = express();
const port = argv.port || 80;

app.use(cors());
app.use(bodyParser());

pazzles(app);

userData(app);

app.get("/api/test", (_, res) => {
  res.send("ok");
});

app.listen(port, () => {
  connect();
  logger.info("starting server on port " + port);
});
