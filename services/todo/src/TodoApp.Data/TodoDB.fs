namespace TodoApp.Data
open TodoApp.Domain
open Microsoft.EntityFrameworkCore
open System


type TodoDB(configure: Action<DbContextOptionsBuilder>) =
  inherit DbContext()

  [<DefaultValue>]
  val mutable todoItems:DbSet<TodoItem>

  member x.TodoItems  
    with get () = x.todoItems
    and set v = x.todoItems <- v

  override x.OnConfiguring (options:DbContextOptionsBuilder) = 
    configure.Invoke(options)