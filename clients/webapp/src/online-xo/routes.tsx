import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import RoomWrapper from "./components/Room";
import Rooms from "./components/Rooms";
import { Links, LinksContext, useLinks } from "./hooks/useLinks";

const Routes = () => {
  const links = useLinks()

  return (
    <LinksContext.Provider value={links}>
      <Switch>
        <Route path={links.roomsPath} component={Rooms} />
        <Route path={links.roomPath} component={RoomWrapper} />
        <Route exact path={links.path}>
          <Redirect to={links.roomsPath} />
        </Route>
      </Switch>
    </LinksContext.Provider>

  )
}

const Warpper = () => {
  return <Links><Routes /></Links>
}

export default Warpper


