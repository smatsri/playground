import * as api from "../api";
import { Pazzle, UserState } from "./types";

export const getUserState = async () => {
  var res = await api.get<UserState>("sudoku/user");
  return res.data;
}

export const setUserState = async (pazzle: Pazzle) => {
  var res = await api.post<UserState>("sudoku/user/pazzle", pazzle);
  return res.data;
}

const getPazzleUrl = (id?: number) => id ? "sudoku/pazzle/" + id : "sudoku/pazzle/";

export const getPazzle = async (pazzleId?: number): Promise<Pazzle> => {
  const url = getPazzleUrl(pazzleId)
  const res = await api.get<any>(url);

  return {
    input: res.data.input,
    pazzleId: res.data.id
  };
}