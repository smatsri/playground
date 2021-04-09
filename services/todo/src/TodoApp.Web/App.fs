module App

open Giraffe
open Microsoft.AspNetCore.Http
open FSharp.Control.Tasks

[<CLIMutable>]
type Person = { Name: string }

[<CLIMutable>]
type Greeting = { Message: string }


let sayHelloWorld next (ctx: HttpContext) =
  task {
    let person = ctx.BindQueryString<Person>()
    let greeting = sprintf "hello %s" person.Name
    let response = { Message = greeting }
    return! json response next ctx
  }

let handler: HttpHandler =
  choose [ route "/api" >=> sayHelloWorld
           setStatusCode 404 >=> text "Not Found" ]
