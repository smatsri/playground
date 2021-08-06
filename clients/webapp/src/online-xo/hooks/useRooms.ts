import { useEffect, useState } from "react"
import { RoomModel } from "../../__generated__/onlinexo/online-xo";
import { getRooms } from "../services/api";

const useRooms = () => {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  useEffect(() => {
    const run = async () => {
      const r = await getRooms();
      setRooms(r);
    }
    setTimeout(() => {
      run();
    }, 2000);
  }, [])
  return {
    rooms
  }
}

export default useRooms;