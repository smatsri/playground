namespace TodoApp.Data

open System.Linq
open Microsoft.EntityFrameworkCore
open TodoApp.Data
open System.Threading.Tasks
open FSharp.Control.Tasks
open TodoApp.Domain

type ITodoRepository =
  abstract member ById: int -> Task<TodoItem>
  abstract member Add: TodoItem -> Task<int>
  abstract member Update: TodoItem -> Task<bool>
  abstract member Delete: int -> Task<bool>

type TodoRepository (db: TodoDB) =

  interface ITodoRepository with
    member x.ById id = 
      task {
        let! item = db.TodoItems.FirstOrDefaultAsync (fun a->a.Id = id)
        return item
      }

    member x.Add item = 
      task {
        db.TodoItems.Add(item) |> ignore
        let! _ = db.SaveChangesAsync()
        return item.Id
      }
    member x.Update item = 
      task {
        db.TodoItems.Attach(item) |> ignore
        let! _ = db.SaveChangesAsync()
        return true
      }

    member x.Delete id = 
      task {
        let! item = db.TodoItems.FirstOrDefaultAsync (fun a->a.Id = id)
        db.TodoItems.Remove(item) |> ignore
        let! _ = db.SaveChangesAsync()
        return true
      }
