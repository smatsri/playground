import React, { FC } from "react"
import { StatusName, TodoItem } from "./model"
import { TodoProvider, useTodoCtx } from "./state"

const TodoItemCard: FC<TodoItem> =
  ({ title, status }) => {
    return (
      <div>
        <h3>{title}</h3>
        <div>Status: {StatusName[status]}</div>
      </div>
    )
  }

const Items = () => {
  const { items } = useTodoCtx();
  return (
    <div>
      {items.map(item => <TodoItemCard key={item.id} {...item} />)}
    </div>
  )
}

const Todo: FC<any> =
  () => {

    return (
      <TodoProvider>
        <h1>Todo</h1>
        <Items />
      </TodoProvider>
    )
  }

export default Todo;