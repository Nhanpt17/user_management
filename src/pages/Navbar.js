import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const isAuthenticated = localStorage.getItem("token") !== null;

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login"); // Điều hướng về Login sau khi Logout
  };

  const goBackHome = () => {
    history.push("/dashboard");
  };

  return (
    <nav>
      {isAuthenticated ? (
        <div>
          <button onClick={goBackHome}>Home</button>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </nav>
  );
};

export default Navbar;
