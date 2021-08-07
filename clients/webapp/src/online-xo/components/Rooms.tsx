import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { RoomModel } from "../../__generated__/onlinexo/online-xo";
import { useLinks } from '../hooks/useLinks';
import useRooms from '../hooks/useRooms';

type SelectRoom = (id: number) => void

const Player = (name: string) => (<li>{name}</li>)

type RoomCardProps = {
  room: RoomModel
  select: SelectRoom
}
const RoomCard = ({ room, select }: RoomCardProps) => {
  const onClick = useCallback(() => select(room.id), [select, room.id])
  return (
    <div onClick={onClick}>
      <div>{room.id}</div>
      <div>{room.name}</div>
      <div>
        <div>player</div>
        <ul>
          {room.players.map(Player)}
        </ul>
      </div>
    </div>
  )
}

const Rooms = () => {
  const { rooms } = useRooms();
  const {roomLink} = useLinks();
  const history = useHistory();

  const onSelect = useCallback<SelectRoom>(id => {
    const path = roomLink(id)
    history.push(path)
  }, [history, roomLink])

  return (
    <div>
      <h2>
        Rooms
      </h2>
      <div>
        {rooms.map(room => <RoomCard key={room.id} room={room} select={onSelect} />)}
      </div>
    </div>
  )
}

export default Rooms;