import moment from "moment"
import React, { useEffect, useState } from "react"
import { TodoItem, TodoItemStatus } from "./model"
import { TodoProvider, useTodoCtx } from "./state"

import "./style.scss"

type BtnsProps = {
  item: TodoItem
}
const Btns = ({ item }: BtnsProps) => {
  const { setStatus } = useTodoCtx()
  switch (item.status) {
    case TodoItemStatus.Active: {
      const markAsDone = () => {
        setStatus(item, TodoItemStatus.Done)
      }

      return (
        <button className="done" onClick={markAsDone}>mark as done</button>
      )
    }

    default:
      return (
        <div></div>
      )
  }
}
const TodoItemCard = (item: TodoItem) => {
  const { title, status, createOn } = item
  const [formated, setFormated] = useState<any>();
  useEffect(() => {
    setFormated(moment(createOn).format('YYYY.MM.DD H:mm'))
  }, [createOn])
  return (
    <div className="card">
      <div className={"status s" + status}></div>
      <div className="title">{title}</div>

      <div className="btns">
        <Btns item={item} />
      </div>
      <div className="info">
        {formated}
      </div>
    </div>
  )
}

const Cards = () => {
  const { items } = useTodoCtx();
  return (
    <div className="cards">
      {items.map(item => <TodoItemCard key={item.id} {...item} />)}
    </div>
  )
}

const Todo = () => {
  return (
    <div className="todo">
      <TodoProvider>
        <h1>Todo</h1>
        <Cards />
      </TodoProvider>
    </div>
  )
}

export default Todo;