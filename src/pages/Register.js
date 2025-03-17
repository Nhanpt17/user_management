import React, { useState } from "react";
import API from "../api";
import { useHistory, Link } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaVenusMars } from "react-icons/fa";

const Register = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    sex: "",
    birthday: "",
    phonenumber: "",
    address: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDateForBackend = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Chuyển đổi thành YYYY-MM-DD
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Nếu đang gửi, không làm gì cả

    if (formData.password !== formData.confirmPassword) {
      setToast({
        show: true,
        message: "Mật khẩu nhập lại không khớp!",
        variant: "danger",
      });
      return;
    }

    if (formData.password.length < 6) {
      setToast({
        show: true,
        message: "Mật khẩu phải có ít nhất 6 ký tự!",
        variant: "danger",
      });
      return;
    }

    const formattedData = {
      ...formData,
      birthday: formatDateForBackend(formData.birthday),
    };

    setIsSubmitting(true); // Khóa nút

    try {
      await API.post("/register", formattedData);

      setToast({
        show: true,
        message: "Đăng ký thành công!",
        variant: "success",
      });

      // Reset form sau khi đăng ký thành công
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        sex: "",
        birthday: "",
        phonenumber: "",
        address: "",
      });

      setTimeout(() => history.push("/login"), 2000);
    } catch (error) {
      const errorMessage = 'Email đã tồn tại';
        
      setToast({
        show: true,
        message: errorMessage,
        variant: "danger",
      });
    } finally {
      setIsSubmitting(false); // Mở khóa nút sau khi xong
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <form
      onSubmit={handleRegister}
      className="w-100 p-3 border rounded bg-white shadow-lg"
      style={{ maxWidth: "450px", fontSize: "18x" }} // Giảm max-width và font-size
    >
      <h3 className="mb-3 text-center text-primary fw-bold" style={{ fontSize: "20px" }}>Đăng ký</h3>

      {/* Tên */}
      <div className="mb-2">
        <label className="form-label">Tên:</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">
            <FaUser className="text-secondary" />
          </span>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-2">
        <label className="form-label">Email:</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">
            <FaEnvelope className="text-secondary" />
          </span>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Mật khẩu */}
      <div className="mb-2">
        <label className="form-label">Mật khẩu:</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">
            <FaLock className="text-secondary" />
          </span>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Nhập lại mật khẩu */}
      <div className="mb-2">
        <label className="form-label">Nhập lại mật khẩu:</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">
            <FaLock className="text-secondary" />
          </span>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Giới tính */}
      <div className="mb-2">
        <label className="form-label">Giới tính:</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">
            <FaVenusMars className="text-secondary" />
          </span>
          <select
            className="form-control"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
      </div>

      {/* Ngày sinh */}
      <div className="mb-2">
        <label className="form-label">Ngày sinh:</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">
            <FaBirthdayCake className="text-secondary" />
          </span>
          <input
            type="date"
            className="form-control"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Số điện thoại */}
      <div className="mb-2">
        <label className="form-label">Số điện thoại:</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">
            <FaPhone className="text-secondary" />
          </span>
          <input
            type="tel"
            className="form-control"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Địa chỉ */}
      <div className="mb-2">
        <label className="form-label">Địa chỉ:</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light">
            <FaMapMarkerAlt className="text-secondary" />
          </span>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Nút Đăng ký */}
      <button type="submit" className="btn btn-primary btn-sm w-100 fw-bold">
      {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang đăng ký...
            </>
          ) : (
            "Đăng ký"
          )}
      </button>

      {/* Chuyển hướng đến trang đăng nhập */}
      <div className="mt-2 text-center">
        <p style={{ fontSize: "12px" }}>
          Đã có tài khoản? <Link to="/login" className="text-decoration-none fw-bold text-primary">Đăng nhập tại đây</Link>
        </p>
      </div>

      {/* Toast thông báo */}
      <ToastContainer position="top-center" className="p-4">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={2000}
          autohide
          bg={toast.variant}
        >
          <Toast.Body className="text-white text-center" style={{ fontSize: "12px" }}>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </form>
  </div>
  );
};

export default Register;
