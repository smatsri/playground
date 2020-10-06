using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace gateway
{
  class Program
  {
    public static void Main(string[] args)
    {
      CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
          var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

          webBuilder.UseStartup<Startup>();
          webBuilder.ConfigureAppConfiguration(config =>
          {
            config.AddJsonFile($"ocelot.json");
          });
        });
  }
}
