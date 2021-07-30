import React from 'react'
import useRooms from '../hooks/useRooms';

const Rooms = () => {
  const {rooms} = useRooms();
  return (
    <div>
      <h2>
        Rooms
      </h2>
      <div>
        num open rooms: {rooms.length}
      </div>
    </div>
  )
}

export default Rooms;