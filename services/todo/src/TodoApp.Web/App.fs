module App

open Giraffe
open Microsoft.AspNetCore.Http
open FSharp.Control.Tasks
open TodoApp.Data
open System.Threading.Tasks
open TodoApp.Domain

let withRepo<'a> (f: ITodoRepository -> Task<'a>) next (ctx: HttpContext) =
  task {
    let repo = ctx.GetService<ITodoRepository>()
    let! res = f repo
    return! Successful.OK res next ctx
  }

let getById id = withRepo (fun repo -> repo.ById id)
let delete id = withRepo (fun repo -> repo.Delete id)
let add item = withRepo (fun repo -> repo.Add item)
let update item = withRepo (fun repo -> repo.Update item)


let todoHandler : HttpHandler =
  choose [ GET >=> subRoutef "/%i" getById
           DELETE >=> subRoutef "/%i" delete
           POST >=> bindJson<TodoItem> add
           PATCH >=> subRoute "/" (bindJson<TodoItem> update) ]

let test next (ctx: HttpContext) =
  task {
    let! a = ctx.BindJsonAsync<TodoItem>()
    return! Successful.OK a next ctx
  }

let handler : HttpHandler =
  choose [ route "/test"
           >=> bindJson<TodoItem> (fun item -> Successful.OK item)

           subRoute "/api/todo" todoHandler
           //setStatusCode 404 >=> text "Not Found"
            ]
