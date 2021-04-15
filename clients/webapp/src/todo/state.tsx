import React, { useEffect, useState, createContext, FC, useContext } from "react"
import { getItems } from "./api"
import { TodoItem } from "./model"

type ITodo = {
  items: TodoItem[]
}

export const useTodo = (): ITodo => {
  const [items, setItems] = useState<TodoItem[]>([])

  useEffect(() => {
    const run = async () => {
      const res = await getItems()
      setItems(res.items)
    }
    run()
  }, [])

  return {
    items
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


