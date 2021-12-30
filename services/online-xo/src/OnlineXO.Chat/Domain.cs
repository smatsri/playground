using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OnlineXO.Chat.Domain
{
	public class ChatMessage
	{
		public ChatUser Sender { get; set; }
		public string Text { get; set; }
	}
	public class ChatUser
	{
		/// <summary>
		/// unique username
		/// </summary>
		[Required]
		[DefaultValue("mr_t")]
		public string Username { get; init; }
		

		public static ChatUser Guest() => new()
		{
			Username = "Guest-" + DateTime.Now.Ticks
		};
	}

	public class Chat
	{
		public ChatUser[] Users { get; set; }
	}
}
