import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaUsersCog } from "react-icons/fa";
import {
  getToken,
  getUserToken,
  removeToken,
  removeUserToken,
} from "./Untils";

import "../css-page/navbar.css";


const Navbar = () => {
  const history = useHistory();
  const isAuthenticated = getToken() !== null;
  const [user, setUser] = useState(getUserToken());
  const isAdmin = user?.role === "admin";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL_IMG;

  useEffect(() => {
    const updateUser = () => {
      setUser(getUserToken());
    };
    window.addEventListener("updateUser", updateUser);
    return () => {
      window.removeEventListener("updateUser", updateUser);
    };
  }, []);

  const toggleDropdown = () => {console.log("dropdown:" + dropdownOpen); setDropdownOpen(!dropdownOpen);console.log("dropdown:" + dropdownOpen);};
  const logout = () => {
    removeToken();
    removeUserToken();
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        {/* Logo */}
        <span className="navbar-brand fw-bold text-uppercase text-gradient">MyApp</span>

        {/* Nút Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          {isAuthenticated && (
            <>
              <button className="btn btn-outline-light mx-2 custom-btn" onClick={() => history.push("/profile")}>
                <FaUser className="me-2" /> Hồ sơ
              </button>

              {isAdmin && (
                <button className="btn btn-outline-light mx-2 custom-btn" onClick={() => history.push("/users")}>
                  <FaUsersCog className="me-2" /> Quản lý
                </button>
              )}
            </>
          )}

          {isAuthenticated ? (

            <div className="nav-item dropdown">
              {/* Avatar */}
              <button className="btn btn-link nav-link text-white dropdown-toggle" onClick={toggleDropdown}>
                <img
                  src={`${apiUrl}/avatar/${user.avatar}` || "https://static.vecteezy.com/system/resources/previews/023/291/014/original/user-account-person-avatar-free-vector.jpg"}
                  alt="Avatar"
                  className="rounded-circle border border-light shadow-sm custom-avatar"
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-end shadow animated-dropdown">
                  <li>
                    <div className="dropdown-item d-flex align-items-center">
                      <img
                        src={`${apiUrl}/avatar/${user.avatar}` || "https://static.vecteezy.com/system/resources/previews/023/291/014/original/user-account-person-avatar-free-vector.jpg"}
                        alt="Avatar"
                        className="rounded-circle border"
                        style={{ width: "20px", height: "20px", marginRight: "10px" }}
                      />
                      <span>{user?.name}</span>
                    </div>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger d-flex align-items-center" onClick={logout}>
                      <FaSignOutAlt className="me-2" /> Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link className="nav-link btn btn-primary text-white fw-bold px-3 custom-login-btn" to="/login">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
