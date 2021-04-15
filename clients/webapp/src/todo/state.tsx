import React, { useEffect, useState, createContext, FC, useContext } from "react"
import * as api from "./api"
import { TodoItem, TodoItemStatus } from "./model"

type ITodo = {
  items: TodoItem[]
  setStatus: (item:TodoItem, status:TodoItemStatus) => void
}

export const useTodo = (): ITodo => {
  const [items, setItems] = useState<TodoItem[]>([])

  useEffect(() => {
    const run = async () => {
      const res = await api.getItems()
      setItems(res.items)
    }
    run()
  }, [])

  return {
    items,
    async setStatus(item,status) {
      const newItem = {...item, status}
      await api.updateItem(newItem)
      const index = items.findIndex(a=>a.id === item.id);
      const newItems = [...items]
      newItems[index] = newItem
      setItems(newItems)
    }
  }
}

const TodoCtx = createContext<ITodo>({} as any)

export const TodoProvider: FC<any> = ({ children }) => {
  const value = useTodo();
  return (
    <TodoCtx.Provider value={value}>
      {children}
    </TodoCtx.Provider>
  )
}

export const useTodoCtx = () => useContext(TodoCtx);


