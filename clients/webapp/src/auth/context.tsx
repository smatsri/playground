import React, { createContext, FC, useContext, useEffect, useState } from "react";
import * as api from "./api";
import { publish } from "./events";
import * as appEvents from "../events";

export interface Guest {
  isAuth: false
}

export interface LoggedInUser {
  isAuth: true
  name: string
}

export type User = Guest | LoggedInUser

export interface AuthState {
  user: User
  login(username: string, password: string, rememberMe: boolean): Promise<any>;
  logout(): Promise<any>
}

const AuthContext = createContext<AuthState>({} as any);


const useProvider = (): AuthState => {
  const [user, setUser] = useState<User>({ isAuth: false })

  useEffect(() => {
    appEvents.subscribe(async (e) => {
      if (e.type === "AppInit") {
        const profile = await api.profile();
        if (profile) {
          setUser({ isAuth: true, name: profile.name });
          publish({ type: "LoggedIn" });
        }
      }
    })
  }, [])

  return {
    user,
    async login(username, password, rememberMe = false) {
      const res = await api.login(username, password, rememberMe);
      const profile = await api.profile();
      setUser({ isAuth: true, name: profile.name });
      publish({ type: "LoggedIn" })
      return res;
    },
    async logout() {
      await api.logout();
      setUser({ isAuth: false })
      publish({ type: "LoggtedOut" })
    }
  }
}

export const AuthProvider: FC = ({ children }) => {
  const value = useProvider();
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);



