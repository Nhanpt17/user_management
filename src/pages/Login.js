import React, { useState } from "react";
import API from "../api";
import { useHistory ,Link} from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/login", { email, password });
      localStorage.setItem("token", data.token);
      
      alert("Đăng nhập thành công!");
      history.push("/dashboard");
    } catch (error) {
      alert("Lỗi: " + error.response.data.error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleLogin} className="w-50 p-4 border rounded bg-light">
        <h2 className="mb-4">Đăng nhập</h2>
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
          Đăng nhập
        </button>
        <div className="mt-3">
          <p>
            Bạn chưa có tài khoản?{" "}
            {/* Sử dụng Link từ react-router-dom thay vì onClick */}
            <Link to="/register">Đăng ký tại đây</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
