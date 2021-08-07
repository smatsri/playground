import { useEffect, useState } from "react"
import { RoomModel } from "../../__generated__/onlinexo/online-xo";
import { getRooms } from "../services/api";
const apply = (f: () => any) => () => f()

const useRooms = () => {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  useEffect(apply(async () => {
    const r = await getRooms();
    setRooms(r);
  }), [])
  return {
    rooms
  }
}

export default useRooms;