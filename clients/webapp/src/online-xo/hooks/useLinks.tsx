import React, { createContext, useCallback, useContext, useState } from "react";
import { useRouteMatch } from "react-router-dom";

type Links = {
  roomsPath: string
  roomPath: string
  path: string
  roomLink: (id: number) => string
}

const usePrivateLinks = (path: string) => {
  const [roomsPath] = useState(() => `${path}/rooms`);
  const [roomPath] = useState(() => `${path}/room/:id`);

  const roomLink = useCallback((id: number) => {
    return `${path}/room/${id}`
  }, [path])

  return {
    roomsPath,
    roomPath,
    path,
    roomLink
  }
}

export const LinksContext = createContext({} as Links)

export const useLinks = () => useContext(LinksContext)


export const Links:any = ({children}: any) => {
  const { path } = useRouteMatch();
  const links = usePrivateLinks(path)
 
  return (
    <LinksContext.Provider value={links}>
      {children}
    </LinksContext.Provider>
  )
}