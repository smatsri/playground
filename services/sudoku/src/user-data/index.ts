import { Express } from "express";
import { auth } from "../auth";
import * as db from "./data"

export default function (app: Express) {

  app.get("/api/user", auth, async (req, res) => {
    const user = (req as any).user;
    const username = user.unique_name;
    const data = await db.getUserState(username);
    res.send(data);
  })

  app.post("/api/user/pazzle", auth, async (req, res) => {
    const user = (req as any).user;
    const username = user.unique_name;
    const data = (req as any).body;
    data.username = username;
    await db.savePazzle(data);
    res.send({ ok: true });
  })

}