import { HubConnectionBuilder } from "@microsoft/signalr"
import { Subject } from "rxjs"
import { onlineXOBaseUrl } from "../../api/config";
import { GameEvent } from "../model/game";


const evts = new Subject<GameEvent>();

const hubUrl = `${onlineXOBaseUrl}/game/xo`
const connection = new HubConnectionBuilder()
  .withUrl(hubUrl)
  .build();

connection.on("onEvent", event => {
  evts.next(event);
});

export const start = async (gameId: number) =>{
  await connection.start();
  console.log('connected to game hub');
  await connection.invoke('Subscribe', gameId)
  
}
  
export const join = (gameId: any, player: number) => {
  connection.invoke("Join", gameId, player);
}

export const getGame = (id: any) => {
  return connection.invoke("Get", id);
}

export const reset = (id: any) => {
  return connection.invoke("Reset", id);
}

export const events = evts.asObservable();

events.subscribe(e => {
  console.log("hub event", e);

})
