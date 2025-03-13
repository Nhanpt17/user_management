import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Dashboard = () => {
  const [users, setUsers] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(data);
        setIsAdmin(data.role === "admin");
      } catch (error) {
        alert("Bạn không có quyền truy cập");
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      {" "}
      <div className="container">
        <h2>Dashboard</h2>
        {isAdmin && (
          <Link to="/users">
            <button>Quản lý User</button>
          </Link>
        )}
        <Link to="/profile">
          <button>Quản lý Hồ sơ</button>
        </Link>
        <div>Xin chào {users.name}</div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Đăng xuất
        </button>
      </div>
    </>
  );
};

export default Dashboard;
