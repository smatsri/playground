import axios from "axios";
import { baseUrl } from "../api/config";

axios.interceptors.request.use(config => {

  config.withCredentials = true;
  return config;
})

const baseIdentityUrl = `${baseUrl}identity/user/`;

export const login = (username: string, password: string): Promise<any> =>
  axios.post(baseIdentityUrl + "login", { username, password })

export const logout = (): Promise<any> =>
  axios.post(baseIdentityUrl + "token");

export const profile = (): Promise<{ username: string }> =>
  axios.get(baseIdentityUrl + "profile");


console.log(123)