import React, { useEffect, useState } from "react";
import API from "../api";
import { Modal, Button } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [userDetails, setUsersDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(window.bootstrap); // Kiểm tra đối tượng bootstrap có sẵn không

        const token = localStorage.getItem("token");
        const { data } = await API.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data);
      } catch (error) {
        alert("Bạn không có quyền truy cập");
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditEmail(user.email);
    setEditName(user.name);
    setEditPassword(user.password);
    setShowModal(true); // Mở modal khi nhấn vào chỉnh sửa

  };

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/users/${editingUser.id}`,
        { email: editEmail, name: editName, password: editPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User đã được cập nhật!");

      const updatedUsers = await API.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(updatedUsers.data);
      setEditingUser(null);
      setShowModal(false); // Đóng modal sau khi cập nhật
    } catch (error) {
      alert("Lỗi: " + error.response.data.message);
    }
  };

  //delete
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này không?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User đã bị xóa!");

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Lỗi: " + error.response.data.message);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get(`users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingUser(null);
      setUsersDetails(data);
      setShowModal(true); // Khi lấy xong thông tin user, hiển thị modal
    } catch (error) {
      alert("Lỗi: + ");
    }
  };

  return (
    <>
      

      <div className="container mt-4">
        <h2>Danh sách User</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
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
                  <button onClick={() => handleEdit(user)}>Chỉnh sửa</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                  <button
                    onClick={() => handleViewDetails(user.id)} // Hiển thị chi tiết khi click
                  >
                    Chi tiết{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa người dùng */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Chỉnh sửa người dùng" : "Chi tiết người dùng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser ? (
            // Nếu đang chỉnh sửa thì hiển thị form chỉnh sửa
            <>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Tên:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div>
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </div>
            </>
          ) : (
            // Nếu không phải chỉnh sửa thì hiển thị thông tin chi tiết người dùng
            userDetails ? (
              <>
                <p><strong>ID:</strong> {userDetails.id}</p>
                <p><strong>Tên:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Vai trò:</strong> {userDetails.role}</p>
                <p><strong>Ngày tạo:</strong> {userDetails.created_at}</p>
              </>
            ) : (
              <p>Đang tải thông tin chi tiết...</p>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          {editingUser ? (
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleUpdateUser}>
                Cập nhật
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => {setShowModal(false);setEditingUser(null);}}>
              Đóng
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;
