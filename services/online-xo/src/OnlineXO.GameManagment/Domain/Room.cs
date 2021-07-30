using System;
using System.Collections.Generic;

namespace OnlineXO.GameManagment.Domain
{
	public class Room
	{
		public Room()
		{
			Players = Array.Empty<Player>();
		}

		public int Id { get; set; }
		public string Name { get; set; }
		public DateTime CreateDate { get; set; }
		public RoomState State { get; set; }
		public ICollection<Player> Players { get; set; }
	}
}
