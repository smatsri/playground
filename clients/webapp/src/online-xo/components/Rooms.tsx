import React, { useCallback } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom';
import { RoomModel } from "../../__generated__/onlinexo/online-xo";
import useRooms from '../hooks/useRooms';

type SelectRoom = (id:number) => void

const Player = (name: string) => (<li>{name}</li>)

type RoomCardProps = {
  room: RoomModel
  select:SelectRoom
}
const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <div>
      <div>id {room.id}</div>
      <div>name {room.name}</div>
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
  const history = useHistory();
  const match = useRouteMatch();

  const onSelect = useCallback<SelectRoom>((id) => {
    history.push(`${match.path}`)
  }, [history,match.path])

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