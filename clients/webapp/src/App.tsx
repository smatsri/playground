import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Sudoku from "./sudoku/Sudoku";
import XO from "./xo";
import SevenBoom from "./seven-boom";
import Chat from "./chat"
import styled from "styled-components";
import { AuthProvider } from "./auth/context";
import HeaderLogin from "./auth/componets/header-login";
import LoginPage from "./auth/componets/login-page";
import { publish } from "./events";

const NavStyle = styled.div`
  nav ul {
    display: flex;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  li {
    width: 100px;
  }
`;

const AppRouter = () => (
  <Switch>
    <Route path="/seven">
      <SevenBoom />
    </Route>
    <Route path="/chat">
      <Chat />
    </Route>
    <Route path="/xo">
      <XO />
    </Route>
    <Route path="/sudoku">
      <Sudoku />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/">
      <Sudoku />
    </Route>
  </Switch>
)

const Nav = () => (
  <NavStyle>
    <nav>
      <ul>
        <li>
          <Link to="/sudoku">sudoku</Link>
        </li>
        <li>
          <Link to="/chat">chat</Link>
        </li>
        <li>
          <Link to="/seven">seven</Link>
        </li>
        <li>
          <Link to="/xo">xo</Link>
        </li>
      </ul>
    </nav>
  </NavStyle>
);

const App = () => {
  useEffect(() => {
    publish({ type: "AppInit" })
  }, [])
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <header>
            <HeaderLogin />
            <Nav />
          </header>
          <AppRouter />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
