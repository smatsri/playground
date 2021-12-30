using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OnlineXO.GameManagment.Startup;
using System;
using System.Text;
using System.Threading.Tasks;
using OnlineXO.Api.Authentication;
using OnlineXO.Hubs.Startup;
using OnlineXO.Chat.Startup;

namespace OnlineXO.Api
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddSignalR();
			services.AddCors();
			services.AddControllers();
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "OnlineXO.Api", Version = "v1" });
			});
			services.AddAuthentication(PlaygroundAuthenticationDefaults.AuthenticationScheme).AddPlayground();

			services.AddGameManger(Configuration);
			services.AddGameHubs();
			services.AddChat();
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OnlineXO.Api v1"));
			} else
			{
				app.UseHttpsRedirection();
			}


			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseCors(builder =>
			{
				builder
				.WithOrigins(new string[] { "http://localhost:3000", "http://localhost:2000" })
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials();
			});


			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

			app.UseGameManger();
			app.UseGameHubs();
			app.UseChat();
		}
	}
}
