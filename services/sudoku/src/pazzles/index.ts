import * as api from "../sudokutouch-api";
import * as db from "./data"
import { Express } from "express";

export default function (app: Express) {

  app.get("/api/pazzle/:num", async (r, s) => {
    const num = r.params.num || "513165662";
    const pazzle = await db.getPazzleById(num);
    s.json(pazzle);
  });

  app.get("/api/pazzle", async (r, s) => {
    const pazzle = await getPazzle();
    s.json(pazzle);
  });

}

export const getPazzle = async () => {
  const pazzle = await api.getPazzle()
  await db.savePazzle(pazzle)
  return pazzle;
}
