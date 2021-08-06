using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineXO.Hubs.Hubs
{
	public class GameHub : Hub
	{
		public async Task Join(int id)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, GameGroupName(id));
		}

		static string GameGroupName(int id) => $"g_{id}";
	}
}
