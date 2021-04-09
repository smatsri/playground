namespace TodoApp.Domain


type ItemStatus =
  | Pending
  | Active
  | Done
  | Suspended

[<CLIMutable>]
type TodoItem =
  { Id: int
    Title: string
    Status: ItemStatus }
