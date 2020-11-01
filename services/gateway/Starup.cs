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
using Prometheus;

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
      var counter = Metrics.CreateCounter("api_gateway_path_counter", "Counts requests to the Locations API endpoints", new CounterConfiguration
      {
        LabelNames = new[] { "method", "endpoint" }
      });
      app.Use((context, next) =>
      {
        counter.WithLabels(context.Request.Method, context.Request.Path).Inc();
        return next();
      });
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

      app.UseHttpMetrics();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapGet("/", async context =>
        {
          await context.Response.WriteAsync("Hello World!");
        });
        endpoints.MapMetrics();
      });

      app.UseOcelot().Wait();
    }
  }
}
