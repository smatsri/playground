import axios from "axios"
import { baseUrl } from "./config";

export const TokenManager = (() => {

  let token = "";
  const get = async (): Promise<string> => {
    if (token) {
      return token;
    }

    const res = await axios.get(baseUrl + "identity/user/token");
    token = res.data.token;
    return token;
  }

  const clear = () => token = ""

  return {
    get,
    clear
  }
})();