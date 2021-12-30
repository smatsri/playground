namespace OnlineXO.Chat.Controllers
{
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.Mvc;
	using OnlineXO.Chat.Models;
	using Services;
	using Domain;

	[Route("api/chat")]
	public class ChatController : Controller
	{
		private readonly IChatService chatService;

		public ChatController(IChatService chatService)
		{
			this.chatService = chatService;
		}

		/// <summary>
		/// return chat details
		/// </summary>
		/// <returns></returns>
		[HttpGet(Name = nameof(Get))]
		[ProducesResponseType(typeof(Chat), 200)]
		public Chat Get()
		{
			return chatService.Get();
		}

		/// <summary>
		/// subscribe to chat events
		/// </summary>
		[HttpPost("subscribe", Name = nameof(Subscribe))]
		[ProducesResponseType(typeof(SubscribeResponse), 200)]
		public async Task<SubscribeResponse> Subscribe(SubscribeRequest request)
		{
			await chatService.Subscribe(request.ConnectionId);

			return new SubscribeResponse
			{
				Success = true
			};
		}

		/// <summary>
		/// braodcast message to all users
		/// </summary>
		[HttpPost("broadcast", Name = nameof(Broadcast))]
		public async Task<BroadcastResponse> Broadcast(BroadcastRequest request)
		{
			await chatService.Broadcast(request.ConnectionId, request.Message);

			return new BroadcastResponse
			{
				Success = true
			};
		}

	}
}