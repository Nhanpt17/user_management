import React, { useState, useEffect } from "react";
import API from "../api";
import { Modal, Button } from 'react-bootstrap';

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState({});
  const [showModal, setShowModal] = useState(false); // state điều khiển modal

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data);
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        alert("Bạn không có quyền truy cập");
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    try {
      const token = localStorage.getItem("token");
      e.preventDefault();
      await API.put(
        `/user/users/${users.id}`,
        { name, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Cập nhật thành công");
      setShowModal(false); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      alert("Lỗi cập nhật");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Hồ sơ cá nhân</h2>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="text"
          readOnly
          className="form-control"
          value={email}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tên:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          readOnly
        />
      </div>
      <div className="mb-3">
        <button
          className="btn btn-warning"
          onClick={() => setShowModal(true)} // Mở modal khi click vào nút chỉnh sửa
        >
          Chỉnh sửa
        </button>
      </div>

      {/* Modal chỉnh sửa */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa hồ sơ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
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
              <label className="form-label">Mật khẩu mới:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                Cập nhật
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
