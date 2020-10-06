import axios, { Method } from "axios";
import { baseUrl } from "./config";
import { TokenManager } from "./token-manager";

const getAuthHeader = async (): Promise<any> => {
  const token = await TokenManager.get();
  return {
    "Authorization": "Bearer " + token
  };
}

const callApi = async <T>(url: string, method: Method, data?: any) => {
  const headers = await getAuthHeader();
  return await axios.request<T>({
    url: baseUrl + url,
    method,
    data,
    headers
  })
}

export const get = <T>(url: string) => callApi<T>(url, "GET");
export const post = <T>(url: string, data: any) => callApi<T>(url, "POST", data);

