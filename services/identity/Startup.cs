using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace IdentityService
{
  public class Startup
  {

    public void ConfigureServices(IServiceCollection services)
    {
      var tokenSecret = "kd3r9HYfBvPKDa6c5YGhpFnwLDpxdT8Ka8Mne8pYaU4aEE5zVk6fLqL8exb3gdEJ";
      services.AddSingleton<IJwtAuthenticationManager>(new JwtAuthenticationManager(tokenSecret));
      services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
      .AddCookie(options =>
      {
        options.Cookie.Name = "auth_cookie";
        //options.Cookie.SameSite = SameSiteMode.None;
        options.Events.OnRedirectToLogin = context =>
        {
          context.Response.StatusCode = StatusCodes.Status401Unauthorized;
          return Task.CompletedTask;
        };
      });

      services.AddAuthorization();
      services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseRouting();
      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        endpoints.MapGet("/", async context =>
        {
          await context.Response.WriteAsync("Hello World!");
        });
      });
    }
  }

}