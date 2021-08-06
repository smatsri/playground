using OnlineXO.GameManagment.Domain;
using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace OnlineXO.GameManagment.Models
{
	public class RoomModel
	{
		[Required]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public RoomState State { get; set; }
		[Required]
		public string[] Players { get; set; }
	}

	public class CreateRoomModel
	{
		[Required]
		public string Name { get; set; }
	}
}
