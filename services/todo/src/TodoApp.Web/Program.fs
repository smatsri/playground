module Program

open System
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.AspNetCore.Builder
open Giraffe
open Microsoft.EntityFrameworkCore
open Microsoft.Extensions.Configuration
open TodoApp.Data

let configureServices (ctx: WebHostBuilderContext) (services: IServiceCollection) =

  // register db
  let connStr =
    ctx.Configuration.GetConnectionString "TodoApp"

  services.AddDbContext<TodoApp.Data.TodoDB>
    (fun builder ->
      builder.UseSqlServer(
        connStr,
        fun o ->
          o.MigrationsAssembly("TodoApp.Migrations")
          |> ignore
      )
      |> ignore)
  |> ignore

  services.AddTransient<ITodoRepository, TodoRepository>()
  |> ignore

  services.AddGiraffe() |> ignore

let configureApp (app: IApplicationBuilder) =
  app
    .UseDeveloperExceptionPage()
    .UseStaticFiles()
    .UseGiraffe(App.handler)
  |> ignore

let configureLogging (builder: ILoggingBuilder) =
  builder.AddConsole().AddDebug() |> ignore

let configure (builder: IWebHostBuilder) =
  builder
    .Configure(configureApp)
    .ConfigureServices(configureServices)
    .ConfigureLogging(configureLogging)
  |> ignore

[<EntryPoint>]
let main args =

  Host
    .CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(Action<IWebHostBuilder> configure)
    .Build()
    .Run()

  0
