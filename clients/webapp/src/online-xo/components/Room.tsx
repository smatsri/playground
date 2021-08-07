import React from "react"
import { RoomModel } from "../../__generated__/onlinexo/online-xo";
import useRoom from "../hooks/useRoom";

type RoomProps = {
  room: RoomModel
}
const Room = ({room}: RoomProps) => {
  return (
    <h2>{room.name}</h2>
  )
}

const Loading = <div>loadind room ...</div>

const RoomWrapper = () => {
  const {room, loading} = useRoom();
  if (loading) {
    return Loading
  }

  return <Room room={room} />
}

export default RoomWrapper