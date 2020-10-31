import React from "react";
import { Link } from "react-router-dom";
import { LoggedInUser, useAuth } from "../context";
const Guest = () => {
  return <div>
    <Link to="login">
      Sign In \ Register
    </Link>
  </div>
}

const LoggedIn = ({ user }: { user: LoggedInUser }) => {
  console.log(user);

  return <div>Welcome {user.name}</div>
}


const HeaderLogin = () => {
  const { user } = useAuth()
  if (user.isAuth) {
    return <LoggedIn user={user}></LoggedIn>
  }

  return <Guest></Guest>
}

export default HeaderLogin;