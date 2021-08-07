import { useEffect, useState } from "react"
import { useRouteMatch } from "react-router-dom";
import { RoomModel } from "../../__generated__/onlinexo/online-xo";
import { getRoom } from "../services/api";

const apply =  (f :() => any ) => () => {f()}

const EmptyRoom: RoomModel = {
  id: 0,
  name: "empty",
  players: [],
  state: 1
}

const useRoom = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const [room, setRooms] = useState<RoomModel>(EmptyRoom);
  const [loading, setLoding] = useState<boolean>(true);

  useEffect(apply(async () => {
    const r = await getRoom(+params.id);
    setRooms(r)
    setLoding(false)
  }), [params.id])


  return {
    room,
    loading
  }
}

export default useRoom;