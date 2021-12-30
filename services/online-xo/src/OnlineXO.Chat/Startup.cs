using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using OnlineXO.Chat.Services;
using OnlineXO.Chat.Hubs;
using System.IO;

namespace OnlineXO.Chat.Startup
{
	public static class StartupExt
	{
		public static void AddChat(this IServiceCollection services)
		{
			services.AddSwaggerGen(c =>
			{
				var filePath = Path.Combine(System.AppContext.BaseDirectory, "OnlineXO.Chat.xml");
				c.IncludeXmlComments(filePath,true);
			});
			services.AddSingleton<IUserService, UserService>();
			services.AddSingleton<IChatService, ChatService>();
		}

		public static void UseChat(this IApplicationBuilder app)
		{
			app.UseEndpoints(ep =>
			{
				ep.MapHub<ChatHub>("/hubs/chat");
			});
		}
	}
}
