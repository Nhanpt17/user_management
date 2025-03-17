import React, { useState } from "react";
import API from "../api";
import { useHistory, Link } from "react-router-dom";
import { setToken,  setUserToken } from "./Untils";
import { Toast, ToastContainer } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icon

const Login = () => {
  const history = useHistory();
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data } = await API.post("/login", { email, password });
      setToken(data.token);
      setUserToken(data.user);

      
      setToast({
        show: true,
        message: "Đăng nhập thành công!",
        variant: "success",
      });

      setTimeout(() => history.push("/profile"));

    } catch (error) {
      setToast({
        show: true,
        message: "Email hoặc mật khẩu không đúng!",
        variant: "danger",
      });
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "12px" }}>
        <h2 className="text-center mb-4 text-primary">Đăng nhập</h2>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope className="text-primary" />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">Mật khẩu:</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock className="text-primary" />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang đăng nhập...
            </>
          ) : (
            "Đăng nhập"
          )}
          </button>

          {/* Đăng ký link */}
          <div className="mt-3 text-center">
            <p>
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="text-decoration-none fw-bold text-primary">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </form>

        
      </div>
      {/* Toast Message */}
      <ToastContainer position="top-center" className="p-4">
          <Toast
            onClose={() => setToast({ ...toast, show: false })}
            show={toast.show}
            delay={2000}
            autohide
            bg={toast.variant}
          >
            <Toast.Body className="text-white text-center">
              {toast.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
    </div>
  );
};

export default Login;
