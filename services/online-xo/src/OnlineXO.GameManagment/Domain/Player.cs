namespace OnlineXO.GameManagment.Domain
{
	public class Player
	{
		public int Id { get; set; }
		public int RoomId { get; set; }
		public string Username { get; set; }

		public Room Room { get; set; }
	}
}
