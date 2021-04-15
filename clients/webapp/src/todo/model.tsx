export enum TodoItemStatus {
  Pending = 1,
  Done = 2,
  Suspended = 3
}

export type TodoItem = {
  id: number
  title: string
  status: TodoItemStatus
  createOn: string
}

export type Page<T> = {
  total: number
  items: T[]
}

export const StatusName = {
  [TodoItemStatus.Pending]: "Pending",
  [TodoItemStatus.Done]: "Done",
  [TodoItemStatus.Suspended]: "Suspended"
}
