using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineXO.Hubs.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineXO.Hubs.Startup
{
	public static class StartupExtensions
	{
		public static void AddGameHubs(this IServiceCollection services)
		{
			services.AddSignalR();

		}

		public static IApplicationBuilder UseGameHubs(this IApplicationBuilder app)
		{
			app.UseEndpoints(ep =>
			{
				ep.MapHub<GameHub>("/game/xo");
			});

			return app;
		}
	}
}
