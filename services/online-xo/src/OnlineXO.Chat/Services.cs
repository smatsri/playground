namespace OnlineXO.Chat.Services
{
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.SignalR;
	using Hubs;
	using Domain;
	using System.Collections.Concurrent;
	using System.Linq;

	public interface IUserService
	{
		bool Add(string id, ChatUser user);
		ChatUser Get(string id);
		ChatUser[] All();
	}

	public class UserService : IUserService
	{
		readonly ConcurrentDictionary<string, ChatUser> users;

		public UserService()
		{
			users = new ConcurrentDictionary<string, ChatUser>();
		}

		public bool Add(string id, ChatUser user)
		{
			return users.TryAdd(id, user);
		}

		public ChatUser Get(string id)
		{
			if (users.ContainsKey(id))
			{
				return users[id];
			}

			return ChatUser.Guest();
		}

		public ChatUser[] All()
		{
			return users.Values.ToArray();
		}

	}

	public interface IChatService
	{
		Task Subscribe(string id);
		Task Broadcast(string senderId, string text);
		Task SendMessage(string senderId, string text, params string[] ids);
		Chat Get();
	}

	public class ChatService : IChatService
	{
		private readonly IHubContext<ChatHub> hub;
		private readonly IUserService userService;

		public ChatService(IHubContext<ChatHub> hub, IUserService userService)
		{
			this.hub = hub;
			this.userService = userService;
		}
		public Task Broadcast(string senderId, string text)
		{
			var message = ChatMessage(senderId, text);

			return hub.Clients.Group("chat").SendAsync("onMessage", message);
		}

		public Task SendMessage(string senderId, string text, params string[] ids)
		{
			var message = ChatMessage(senderId, text);

			return hub.Clients.Clients(ids).SendAsync("onMessage", message);
		}

		public Task Subscribe(string id)
		{
			return hub.Groups.AddToGroupAsync(id, "chat");
		}

		public Chat Get()
		{
			return new Chat
			{
				Users = userService.All()
			};
		}

		ChatMessage ChatMessage(string senderId, string text)
		{
			var sender = userService.Get(senderId);
			return new ChatMessage
			{
				Text = text,
				Sender = sender
			};
		}


	}

}
