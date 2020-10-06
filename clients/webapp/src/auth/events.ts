import { Subject } from "rxjs"
export type LoggedIn = {
  type: "LoggedIn"
}

export type LoggtedOut = {
  type: "LoggtedOut"
}

type Evt = LoggedIn | LoggtedOut

const events = new Subject<Evt>();

export const publish = (evt: Evt) => events.next(evt);
export const subscribe = (callback: (evt: Evt) => void) => {
  const sub = events.subscribe(callback);
  return () => sub.unsubscribe();
}
