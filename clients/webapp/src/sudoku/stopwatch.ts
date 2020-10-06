import { OnTick } from "./types";

export const Stopwatch = (startSec = 0) => {
  let id = -1;
  let totalSec = startSec;
  let listeners: OnTick[] = [];
  const start = () => {
    id = <any>setInterval(() => {
      totalSec++;
      for (const listener of listeners) {
        try {
          listener(totalSec);
        } catch (error) {
          console.error(error);
        }
      }
    }, 1000);
  };

  const stop = () => {
    clearInterval(id);
  };

  const reset = () => {
    id = 0;
  };

  const subscribe = (onTick: OnTick) => {
    listeners.push(onTick);
    return () => {
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i] === onTick) {
          listeners.splice(i, 1);
        }
      }
    };
  };

  return { start, stop, reset, subscribe };
};
