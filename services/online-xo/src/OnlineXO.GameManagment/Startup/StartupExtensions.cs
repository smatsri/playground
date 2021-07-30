using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineXO.GameManagment.Data;
using OnlineXO.GameManagment.Models;
using OnlineXO.GameManagment.Validations;
using System.Linq;

namespace OnlineXO.GameManagment.Startup
{
	public static class StartupExtensions
	{
		public static void AddGameManger(this IServiceCollection services, IConfiguration cfg)
		{
			services.AddDbContext<Data.GameManagmentDb>(options =>
			{
				options.UseSqlite(cfg.GetConnectionString("Managment"));
			});

			services.AddTransient<RoomService>();

			services.AddAutoMapper(a =>
			{
				a.AddProfile(new Mapping.MngProfile());
			});

			services.AddMvc().AddFluentValidation();
			services.AddTransient<IValidator<CreateRoomModel>, CreateRoomValidator>();
		}

		public static void UseGameManger(this IApplicationBuilder app)
		{
			var scope = app.ApplicationServices.CreateScope();
			var db = scope.ServiceProvider.GetService<GameManagmentDb>();

			db.Database.EnsureCreated();
		}
	}
}
