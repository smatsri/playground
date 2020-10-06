using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace gateway
{
  public class Startup
  {
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddOcelot();
      services.AddCors();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseRouting();
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
        endpoints.MapGet("/", async context =>
        {
          await context.Response.WriteAsync("Hello World!");
        });
      });

      app.UseOcelot().Wait();
    }
  }
}
