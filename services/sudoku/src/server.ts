import { argv } from "yargs";
import express from "express";
import cors from "cors";
import jwt from "express-jwt";
import logger from "./logger";
import { getPazzle, getPazzleById } from "./sudokutouch";
//import { connect } from "./data";

const app = express();
const port = argv.port || 80;

app.use(cors());


const auth = jwt({ secret: 'kd3r9HYfBvPKDa6c5YGhpFnwLDpxdT8Ka8Mne8pYaU4aEE5zVk6fLqL8exb3gdEJ', algorithms: ['HS256'] });
//app.use(jwt({ secret: 'kd3r9HYfBvPKDa6c5YGhpFnwLDpxdT8Ka8Mne8pYaU4aEE5zVk6fLqL8exb3gdEJ', algorithms: ['HS256'] }))

app.get("/api/pazzle/:num", async (r, s) => {
  const num = r.params.num || "513165662";
  const pazzle = await getPazzleById(num);
  s.json(pazzle);
});

app.get("/api/pazzle", async (r, s) => {
  const pazzle = await getPazzle();
  s.json(pazzle);
});

app.get("/api/user", auth, (req, res) => {
  const user = (req as any).user;
  res.send(user)
})

app.get("/api", (_, res) => {
  res.send("sudoku api");
});

app.listen(port, () => {
  //connect();
  logger.info("starting server on port " + port);
});
