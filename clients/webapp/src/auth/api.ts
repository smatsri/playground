import axios from "axios";
import { baseUrl } from "../api/config";

axios.interceptors.request.use(config => {

  config.withCredentials = true;
  return config;
})

const baseIdentityUrl = `${baseUrl}/identity/user/`;

export const login = (username: string, password: string, rememberMe: boolean): Promise<any> =>
  axios.post(baseIdentityUrl + "login", { username, password, rememberMe })

export const logout = (): Promise<any> =>
  axios.post(baseIdentityUrl + "logout");

export const profile = (): Promise<{ name: string }> =>
  axios.get(baseIdentityUrl + "profile").then(a => a.data);