import { Subject } from "rxjs"

export type AppInit = {
  type: "AppInit"
}

type Evt = AppInit

const events = new Subject<Evt>();

export const publish = (evt: Evt) => events.next(evt);
export const subscribe = (callback: (evt: Evt) => void) => {
  const sub = events.subscribe(callback);
  return () => sub.unsubscribe();
}
