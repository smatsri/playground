import { onlineXOBaseUrl as baseUrl } from "../../api/config"
import { Api } from "../../__generated__/onlinexo/online-xo";

const api = new Api({baseURL:baseUrl});

export const getRooms = async () => {
  const res = await api.api.getAll()
  return res.data;
}