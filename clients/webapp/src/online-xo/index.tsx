import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import Rooms from "./components/Rooms";


const OnlineXO = () => {
  const { path, url } = useRouteMatch();
  const [roomsPath] = useState(() => `${path}/rooms`);

  return (
    <div>
      <h1>
        Online XO
      </h1>
      <div>
        <Switch>
          <Route path={roomsPath} component={Rooms} />
          <Route exact path={path}>
            <Redirect to={roomsPath} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default OnlineXO;