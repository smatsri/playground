import { useEffect, useState } from "react"
import { getRooms } from "../services/api";

const useRooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
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