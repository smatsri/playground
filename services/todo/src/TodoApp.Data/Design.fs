namespace TodoApp.Data.Design
open Microsoft.EntityFrameworkCore.Design
open Microsoft.Extensions.Configuration
open Microsoft.EntityFrameworkCore

//type TodoDBFactory() =
  
//    interface Microsoft.EntityFrameworkCore.Design.IDesignTimeDbContextFactory<TodoApp.Data.TodoDB> with 
//        member x.CreateDbContext args =
//          let configuration = 
//            ConfigurationBuilder()
//              .SetBasePath(System.IO.Directory.GetCurrentDirectory())
//              .AddJsonFile("appsettings.json")
//              .Build()

//          let connStr = configuration.GetConnectionString("TodoApp")
//          let builder = new DbContextOptionsBuilder()
//          builder.UseSqlServer(connStr, 
//              fun o -> o.MigrationsAssembly("TodoApp.Migrations") |> ignore) 
//            |> ignore
//          new TodoApp.Data.TodoDB(builder.Options)

