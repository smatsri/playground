import { subscribe } from "../auth/events";
import { TokenManager } from "./token-manager";

subscribe(evt => {
  switch (evt.type) {
    case "LoggedIn":
      TokenManager.get();
      break;
    case "LoggtedOut":
      TokenManager.clear();
      break;

  }
})