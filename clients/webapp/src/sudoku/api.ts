import * as api from "../api";
import { sudokuBaseUrl } from "../api/config";
import { Pazzle, UserState } from "./types";

export const getUserState = async () => {
  var res = await api.get<UserState>(sudokuBaseUrl + "/user");
  return res.data;
}

export const setUserState = async (pazzle: Pazzle) => {
  var res = await api.post<UserState>(sudokuBaseUrl + "/user/pazzle", pazzle);
  return res.data;
}

const getPazzleUrl = (id?: number) => sudokuBaseUrl + (id ? "/pazzle/" + id : "/pazzle");

export const getPazzle = async (pazzleId?: number): Promise<Pazzle> => {
  const url = getPazzleUrl(pazzleId)
  const res = await api.get<any>(url);

  return {
    input: res.data.input,
    pazzleId: res.data.id
  };
}