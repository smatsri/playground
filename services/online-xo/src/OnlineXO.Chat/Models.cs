using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OnlineXO.Chat.Models
{
	public class ApiRequest
	{
		[Required]
		public string ConnectionId { get; init; }
	}

	public class SubscribeRequest : ApiRequest
	{

	}

	public class ApiResponse
	{
		[DefaultValue(true)]
		public bool Success { get; init; }

	}

	public class SubscribeResponse : ApiResponse
	{

	}

	public class BroadcastRequest : ApiRequest
	{
		/// <summary>
		/// the message to send
		/// </summary>
		[Required]
		[DefaultValue("hello everyone...")]
		public string Message { get; init; }
	}

	public class BroadcastResponse : ApiResponse
	{

	}

}
