
import * as api from "../../api";
import { onlineXOBaseUrl as baseUrl } from "../../api/config"

export const getRooms = async () => {
  const res = await api.get<any>(`${baseUrl}/api/rooms/claims`)
  return res.data;
}