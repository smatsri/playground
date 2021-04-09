namespace TodoApp.Domain

open System


type ItemStatus =
  | Pending = 0
  | Active = 1
  | Done = 2
  | Suspended = 3

[<CLIMutable>]
type TodoItem =
  { Id: int
    Title: string
    Status: ItemStatus }
