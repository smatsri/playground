using Microsoft.EntityFrameworkCore;
using OnlineXO.GameManagment.Data;
using OnlineXO.GameManagment.Domain;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineXO.GameManagment
{
	public class RoomService
	{
		private readonly GameManagmentDb db;

		public RoomService(GameManagmentDb db)
		{
			this.db = db;
		}

		public Task<Room[]> GetOpenRooms()
		{
			return db.Rooms
				.Where(a => a.State == RoomState.Opened)
				.OrderByDescending(a => a.CreateDate)
				.ToArrayAsync();
		}

		public async Task<Room> CreateRoom(string name)
		{
			var room = new Room
			{
				CreateDate = DateTime.UtcNow,
				Name = name,
				State = RoomState.Opened
			};

			db.Rooms.Add(room);
			await db.SaveChangesAsync();
			return room;
		}

		public async Task Join(int gameId, string username)
		{
			var game = await db.Rooms.FindAsync(gameId);
			var player = new Player
			{
				Username = username
			};
			game.Players.Add(player);

			await db.SaveChangesAsync();
		}
	}
}
