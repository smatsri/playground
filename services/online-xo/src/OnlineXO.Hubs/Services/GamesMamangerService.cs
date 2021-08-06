using Microsoft.Extensions.Hosting;
using OnlineXO.Core;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineXO.Hubs.Services
{
	public class GamesMamangerService : IHostedService, IGameManager
	{
		public void Exec(int gameId, Command command)
		{
		}

		public async Task StartAsync(CancellationToken cancellationToken)
		{
		}

		public async Task StopAsync(CancellationToken cancellationToken)
		{
		}
	}
}
