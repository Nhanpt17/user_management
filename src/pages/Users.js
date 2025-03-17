import React, { useEffect, useState } from "react";
import API from "../api";
import { Modal, Button, Toast, Form, ToastContainer } from "react-bootstrap";
import { getToken } from "./Untils";
import "../css-page/users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL_IMG;
  
  const [userDetails, setUsersDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalViewDeltai, setModalViewDetail] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null); // Thêm state để hiển thị ảnh
  const [refresh, setRefresh] = useState(false); // State để trigger useEffect
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true); // State kiểm soát loading

  const genderMap = {
    male: "Nam",
    female: "Nữ",
    other: "Khác",
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        const { data } = await API.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data);
      } catch (error) {
        setToast({
          show: true,
          message: "Bạn không có quyền truy cập!",
          variant: "danger",
        });
      } finally{
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    //doc file thanh url
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result); // luu vao state de hien thi
    };

    reader.readAsDataURL(file);
  };

  const handleOpenConfirm = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };
  

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData();
    formData.append("name", editUser.name);
    formData.append("email", editUser.email||null);
    formData.append("password", editUser.password||null);
    formData.append("sex", editUser.sex||null);
    formData.append("birthday", editUser.birthday||null);
    formData.append("address", editUser.address||null);
    formData.append("phonenumber", editUser.phonenumber||null);

    if (selectedFile) formData.append("avatar", selectedFile);

    setIsSubmitting(true);

    try {
      const token = getToken();
      await API.post(`/users/${editUser.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setToast({
        show: true,
        message: "User đã được cập nhật!!",
        variant: "success",
      });

      setRefresh((pre) => !pre); // doi gia tri refresh
      setShowModal(false); // Đóng modal sau khi cập nhật
    } catch (error) {
      setToast({
        show: true,
        message: "Cập nhật thất bại!!",
        variant: "danger",
      });
    } finally {
      setIsSubmitting(false);
      
    }
  };

  //delete
  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    if (!selectedUserId) return;
  
    setIsSubmitting(true);
    try {
      const token = getToken();
      await API.delete(`/users/${selectedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setToast({
        show: true,
        message: "User đã bị xóa!",
        variant: "success",
      });
      setRefresh((pre) => !pre);
    } catch (error) {
      setToast({
        show: true,
        message: "Xóa thất bại!",
        variant: "danger",
      });
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false); // Đóng modal
    }
  };

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleViewDetails = async (id, type) => {
    if (isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const token = getToken();

      const { data } = await API.get(`users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsersDetails(data);
      setEditUser(data);
      if (type === "edit") {
        
        setShowModal(true);
      
      } else {
        setModalViewDetail(true);
      } // Khi lấy xong thông tin user, hiển thị modal
    } catch (error) {
      setToast({
        show: true,
        message: "Không lấy được thông tin người dùng!",
        variant: "danger",
      });
    } finally {
      const avatarUrl = `${apiUrl}/avatar/${userDetails.avatar}`;
      setIsSubmitting(false);
      console.log("file ảnh:", userDetails.avatar);
      console.log("API URL:", apiUrl);
      console.log("Full Avatar URL:", avatarUrl);
      const avatarUrl2 = `${apiUrl}/avatar/${editUser.avatar}`;
      
        console.log("ed file ảnh:", editUser.avatar);
        console.log("ed API URL:", apiUrl);
        console.log("ed Full Avatar URL:", avatarUrl2);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }


  return (
    
    <>
    <div className="container mt-4">
  <h2 className="text-center fw-bold text-primary">Danh sách User</h2>

  <table className="table table-bordered text-center table-custom"> {/* Thêm text-center vào bảng */}
    <thead  className="custom-thead">
      <tr >
        <th className="custom-thead">ID</th>
        <th className="custom-thead">Tên</th>
        <th className="custom-thead">Email</th>
        <th className="custom-thead">Vai trò</th>
        <th className="custom-thead">Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <button className="btn btn-warning me-2" onClick={() => handleViewDetails(user.id, 'edit')}>Chỉnh sửa</button>
            <button className="btn btn-danger me-2" onClick={() => handleOpenConfirm(user.id)}>Xóa</button>
            <button className="btn btn-info" onClick={() => handleViewDetails(user.id, 'view')}>Chi tiết</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/*model chinh sua nguoi dung*/}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>✏️ Chỉnh sửa Người Dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              // src={preview || editUser.avatar}
              src={preview ||`${apiUrl}/avatar/${editUser.avatar}`}
              alt="Avatar"
              className="rounded-circle shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
          <Form onSubmit={handleUpdateUser} className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>📸 Ảnh đại diện</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>📝 Tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleChange}
                placeholder="Nhập tên..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>📧 Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleChange}
                placeholder="Nhập email..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>🔑 Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={editUser.password}
                onChange={handleChange}
                placeholder="••••••"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>⚥ Giới tính</Form.Label>
              <Form.Select
                name="sex"
                value={editUser.sex}
                onChange={handleChange}
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>🎂 Ngày sinh</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={editUser.birthday}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>📱 Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                name="phonenumber"
                value={editUser.phonenumber}
                onChange={handleChange}
                placeholder="Nhập số điện thoại..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>📍 Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editUser.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ..."
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
              ❌ Hủy
              </Button>
              <Button variant="primary" type="submit">
                💾 Cập nhật
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* model  xem chi tiet */}
      <Modal
        show={showModalViewDeltai}
        onHide={() => setModalViewDetail(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>👤 Thông tin Người Dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
               //src={userDetails.avatar}
               src={`${apiUrl}/avatar/${userDetails.avatar}`}
              alt="Avatar"
              className="rounded-circle shadow-lg"
              style={{ height: "150px", width: "150px", objectFit: "cover" }}
            />
          </div>
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">
              <strong>🆔 ID:</strong> {userDetails.id}
            </li>
            <li className="list-group-item">
              <strong>🔠 Tên:</strong> {userDetails.name}
            </li>
            <li className="list-group-item">
              <strong>📧 Email:</strong> {userDetails.email}
            </li>
            <li className="list-group-item">
              <strong>⚤  Giới tính:</strong>{" "}
              {genderMap[userDetails.sex] || "Không xác định"}
            </li>
            <li className="list-group-item">
              <strong>🎂 Ngày sinh:</strong> {userDetails.birthday}
            </li>
            <li className="list-group-item">
              <strong>🎭 Vai trò:</strong> {userDetails.role}
            </li>
            <li className="list-group-item">
              <strong>📍 Địa chỉ:</strong> {userDetails.address}
            </li>
            <li className="list-group-item">
              <strong>📱Số điện thoại:</strong> {userDetails.phonenumber}
            </li>
            <li className="list-group-item">
              <strong>📅 Ngày tạo:</strong> {userDetails.created_at}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalViewDetail(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Xác nhận xóa</Modal.Title>
  </Modal.Header>
  <Modal.Body>Bạn có chắc chắn muốn xóa user này không?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
      Hủy
    </Button>
    <Button variant="danger" onClick={handleConfirmDelete}>
      Xóa
    </Button>
  </Modal.Footer>
</Modal>


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
    </>
  );
};

export default Users;
