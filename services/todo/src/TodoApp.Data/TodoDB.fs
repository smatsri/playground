namespace TodoApp.Data

open TodoApp.Domain
open Microsoft.EntityFrameworkCore


type TodoDB(options: DbContextOptions) =
  inherit DbContext(options)

  [<DefaultValue>]
  val mutable todoItems: DbSet<TodoItem>

  member x.TodoItems
    with get () = x.todoItems
    and set v = x.todoItems <- v

