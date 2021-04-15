import * as api from "../api";
import { baseUrl } from "../api/config";
import { Page, TodoItem } from "./model";

const BASE_URL = baseUrl + "/todo"

export const getItems = () =>
  api.get<Page<TodoItem>>(BASE_URL)
    .then(a => a.data)