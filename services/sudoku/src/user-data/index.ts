import { Express } from "express";
import { auth } from "../auth";
import { getUserState, savePazzle } from "./data"
export default function (app: Express) {

  app.get("/api/user", auth, async (req, res) => {
    const user = (req as any).user;
    const username = user.unique_name;
    const data = await getUserState(username);
    res.send(data);
  })

  app.post("/api/user", auth, async (req, res) => {
    const user = (req as any).user;
    const username = user.unique_name;
    const data = (req as any).body;

    await savePazzle(username, data);
    res.send({ ok: true });
  })

}