import React, { useState } from "react";
import API from "../api";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    

    e.preventDefault();

    try {
      await API.post("/register", { name, email, password });
      alert("Đăng ký thành công!");
    } catch (error) {
      alert("Lỗi: " + JSON.stringify(error.response.data.errors));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleRegister}
        className="w-50 p-4 border rounded bg-light"
      >
        <h2 className="mb-4">Đăng ký</h2>
        <div className="mb-3">
          <label className="form-label">Tên:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Đăng ký
        </button>
        <div className="mt-3 text-center">
          <p>
            Đã có tài khoản?{" "}
            {/* Link đến trang đăng nhập */}
            <Link to="/login">Đăng nhập tại đây</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
