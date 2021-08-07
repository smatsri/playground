import { AxiosResponse } from "axios";
import { onlineXOBaseUrl as baseUrl } from "../../api/config"
import { Api } from "../../__generated__/onlinexo/online-xo";

const api = new Api({baseURL:baseUrl}).api;

type Req<T>  = Promise<AxiosResponse<T>>

const r = async <T>(req:Req<T> ) => {
  const res = await req;
  return res.data;
}

export const getRooms = () => r(api.getAll())

export const getRoom = (id: number) => r(api.getById(id))