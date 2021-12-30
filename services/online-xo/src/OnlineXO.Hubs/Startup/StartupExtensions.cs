using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using OnlineXO.Hubs.Hubs;
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
			services
				.AddSignalR()
				.AddNewtonsoftJsonProtocol(options =>
				{
					//var contractResolver = new DefaultContractResolver
					//{
					//	NamingStrategy = new CamelCaseNamingStrategy()
					//};
					//options.PayloadSerializerSettings.ContractResolver = contractResolver;
					//options.PayloadSerializerSettings.TypeNameHandling = Newtonsoft.Json.TypeNameHandling.All;
					options
						.PayloadSerializerSettings
						.Converters.Add(new KeysJsonConverter());


				});

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
