import React, { useState, useEffect } from "react";
import API from "../api";
import { Modal, Button, Toast, ToastContainer,Form } from "react-bootstrap";
import { getToken, setUserToken } from "./Untils";
import "../css-page/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phonenumber: "",
    role:"",
    sex: "",
    birthday: "",
    address: "",
    avatar: null,
  });

  const [editUser, setEditUser] = useState({
    name: "",
    phonenumber: null,
    sex: null,
    birthday: null,
    address: null,
    avatar: null,
  });

  
  const [refresh, setRefresh] = useState(false); // State để trigger useEffect
  const [selectedFile,setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null); // Thêm state để hiển thị ảnh
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // State cho Toast
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/profile", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setUser((prev) => ({ ...prev, ...data }));
        setEditUser((prev) => ({ ...prev, ...data }));

        let userStorage = {role:data.role,
          name:data.name,
          id:data.id,
          avatar:data.avatar
        };
        
        //Lưu lại vào localStorage
        setUserToken(userStorage)
        window.dispatchEvent(new Event("updateUser")); // Gửi sự kiện updateUser để Navbar cập nhật  
        /////////////////
      } catch {
        setToast({
          show: true,
          message: "Bạn không có quyền truy cập!",
          variant: "danger",
        });
        
      }
    };
    fetchProfile();
  }, [refresh]);

  
  

  

 

    const handleChange = (e) => {
      setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };
  
    const handlePasswordChange=(e)=>{
      setPasswords({...passwords,[e.target.name]:e.target.value});
    };

    const handleFileChange=(e)=>{
      const file = e.target.files[0];
      if(!file) return;

      setSelectedFile(file);
      
      //doc file thanh url
      const reader = new FileReader();
      reader.onload = ()=>{
        setPreview(reader.result);// luu vao state de hien thi
      };

      reader.readAsDataURL(file);
    };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);
    
    if (editUser.birthday) {
      editUser.birthday = new Date(editUser.birthday).toISOString().split("T")[0];
      console.log("birthday: " + editUser.birthday);
    }

    const formData = new FormData();
  formData.append("name", editUser.name);
  formData.append("phonenumber", editUser.phonenumber);
  formData.append("sex", editUser.sex);
  formData.append("birthday", editUser.birthday);
  formData.append("address", editUser.address);


    if(selectedFile){
      formData.append("avatar",selectedFile);
    }

    try {
      await API.post(`/user/users/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setToast({
        show: true,
        message: "Cập nhật thành công!",
        variant: "success",
      });
      setRefresh((prev) => !prev); // Đổi giá trị `refresh` để trigger lại `useEffect`
      //////////////
      
    
      setShowModal(false);
    } catch {
      setToast({
        show: true,
        message: "Lỗi cập nhật!",
        variant: "danger",
      });
      
    }finally{
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if(isSubmitting) return;
    if(passwords.password.length <6 ){
      
      setToast({
        show: true,
        message: "Mật khẩu phải ít nhất 6 ký tự!",
        variant: "danger",
      });
      return;
    }
    if (passwords.password !== passwords.confirmPassword) {
      
      setToast({
        show: true,
        message: "Mật khẩu xác nhận không khớp!",
        variant: "danger",
      });
      return;
    }
    setIsSubmitting(false);
    let newPassword = {
      name:user.name,
      password:passwords.password,
      confirmPassword:passwords.confirmPassword
    }
    

    try {
      await API.post(`/user/users/${user.id}`, newPassword, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setToast({
        show: true,
        message: "Đổi mật khẩu thành công!",
        variant: "success",
      });
      setShowPasswordModal(false);
      setPasswords({ password: "", confirmPassword: "" });
    } catch {
      
      setToast({
        show: true,
        message: "Lỗi khi đổi mật khẩu!",
        variant: "danger",
      });
    }finally{
      setIsSubmitting(false);
    }
  };

  const handleTmp = () => {};

  const genderMap = {
    male: "Nam",
    female: "Nữ",
    other: "Khác",
  };
  
 

   return (
    
   


  //   <div className="container mt-5">
  //     <h2>Hồ sơ cá nhân</h2>
  //     <div className="mb-3">
  //       <label className="form-label">Ảnh đại diện:</label>
  //       <img
  //         src={user.avatar}
  //         alt="Avatar"
  //         className="img-thumbnail"
  //         style={{ width: "150px", height: "150px" }}
  //       />
  //     </div>
      

  //     <form onSubmit={handleTmp}>
  //       {/* Tên */}
  //       <div className="mb-3">
  //         <label className="form-label">Tên:</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="vname"
  //           value={user.name || ""}
  //           readOnly
  //         />
  //       </div>

  //       {/* Giới tính */}
  //       <div className="mb-3">
  //         <label className="form-label">Giới tính:</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="vsex"
  //           value={genderMap[user.sex] || "Chưa xác định"}
  //           readOnly
  //         />
  //       </div>

  //       {/* Ngày sinh */}
  //       <div className="mb-3">
  //         <label className="form-label">Ngày sinh:</label>
  //         <input
  //           type="date"
  //           className="form-control"
  //           name="vbirthday"
  //           value={user.birthday || ""}
  //           readOnly
  //         />
  //       </div>

  //       {/* Số điện thoại */}
  //       <div className="mb-3">
  //         <label className="form-label">Số điện thoại:</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="vphonenumber"
  //           value={user.phonenumber || ""}
  //           readOnly
  //         />
  //       </div>

  //       {/* Địa chỉ */}
  //       <div className="mb-3">
  //         <label className="form-label">Địa chỉ:</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="vaddress"
  //           value={user.address || ""}
  //           readOnly
  //         />
  //       </div>
  //     </form>

  //     <div className="mb-3">
  //       <button
  //         className="btn btn-warning me-2"
  //         onClick={() => setShowModal(true)}
  //       >
  //         Chỉnh sửa hồ sơ
  //       </button>
  //       <button
  //         className="btn btn-danger"
  //         onClick={() => setShowPasswordModal(true)}
  //       >
  //         Đổi mật khẩu
  //       </button>
  //     </div>
  //     {/* chinh sua thogn tin ca nhan */}
  //      {/* Modal cập nhật */}
  //      <Modal show={showModal} onHide={() => setShowModal(false)}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Chỉnh sửa hồ sơ</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //       <div className="mb-3">
  //             <label className="form-label">Ảnh đại diện:</label>
  //             <img
  //               src={preview || editUser.avatar} // Nếu có ảnh mới thì hiển thị ảnh mới, không thì hiển thị avatar cũ
  //               alt="Avatar"
  //               className="img-thumbnail"
  //               style={{ width: "150px", height: "150px" }}
  //             />
  //           </div>

  //         <Form onSubmit={handleUpdate}>
  //           <Form.Group>
  //             <Form.Label>Ảnh đại diện</Form.Label>
  //             <Form.Control type="file"  onChange={handleFileChange} accept="image/*"></Form.Control>
              
  //           </Form.Group>
            
  //           <Form.Group>
  //             <Form.Label>Tên</Form.Label>
  //             <Form.Control type="text" name="name" value={editUser.name} onChange={handleChange} required />
  //           </Form.Group>

  //           <Form.Group>
  //             <Form.Label>Giới tính</Form.Label>
  //             <Form.Select name="sex" value={editUser.sex} onChange={handleChange}>
  //               <option value="male">Nam</option>
  //               <option value="female">Nữ</option>
  //               <option value="other">Khác</option>
  //             </Form.Select>
  //           </Form.Group>

  //           <Form.Group>
  //             <Form.Label>Ngày sinh</Form.Label>
  //             <Form.Control type="date" name="birthday" value={editUser.birthday} onChange={handleChange} />
  //           </Form.Group>

  //           <Form.Group>
  //             <Form.Label>Số điện thoại</Form.Label>
  //             <Form.Control type="text" name="phonenumber" value={editUser.phonenumber} onChange={handleChange} />
  //           </Form.Group>

  //           <Form.Group>
  //             <Form.Label>Địa chỉ</Form.Label>
  //             <Form.Control type="text" name="address" value={editUser.address} onChange={handleChange} />
  //           </Form.Group>

  //           <Button variant="primary" type="submit" className="mt-3">Cập nhật</Button>
  //         </Form>
  //       </Modal.Body>
  //     </Modal>

  //     {/* Modal đổi mật khẩu */}
  //     <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Đổi mật khẩu</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form onSubmit={handleChangePassword}>
  //           {/* Hiển thị tên người dùng (chỉ đọc) */}
  //           <Form.Group>
  //             <Form.Label>Tên người dùng</Form.Label>
  //             <Form.Control type="text" value={user.name} readOnly />
  //           </Form.Group>

  //           {/* Nhập mật khẩu mới */}
  //           <Form.Group>
  //             <Form.Label>Mật khẩu mới</Form.Label>
  //             <Form.Control
  //               type="password"
  //               name="password"
  //               value={passwords.password}
  //               onChange={handlePasswordChange}
  //               required
  //             />
  //           </Form.Group>

  //           {/* Nhập lại mật khẩu */}
  //           <Form.Group>
  //             <Form.Label>Nhập lại mật khẩu</Form.Label>
  //             <Form.Control
  //               type="password"
  //               name="confirmPassword"
  //               value={passwords.confirmPassword}
  //               onChange={handlePasswordChange}
  //               required
  //             />
  //           </Form.Group>

  //           <Button variant="primary" type="submit" className="mt-3">
  //             Đổi mật khẩu
  //           </Button>
            
  //         </Form>
  //       </Modal.Body>
  //     </Modal>


  //     {/* Bootstrap Toast */}
  //     <ToastContainer
  //       position="top-center"
  //       className="p-3"
  //       style={{ zIndex: 9999999  }}
  //     >
  //       <Toast
  //         onClose={() => setToast({ ...toast, show: false })}
  //         show={toast.show}
  //         delay={2000}
  //         autohide
  //         bg={toast.variant}
          
  //       >
  //         <Toast.Header>
  //           <strong className="me-auto">Thông báo</strong>
  //         </Toast.Header>
  //         <Toast.Body>{toast.message}</Toast.Body>
  //       </Toast>
  //     </ToastContainer>
  //   </div>



<div className="container mt-4">
<h2 className="text-center fw-bold text-primary mb-3 fs-4">📋 Hồ sơ cá nhân</h2>

  <div
    className="card shadow-sm rounded p-3 mx-auto"
    style={{ maxWidth: "530px", backgroundColor: "#f8f9fa" }}
  >
    {/* Ảnh đại diện */}
    <div className="text-center mb-2">
      <img
        src={user.avatar}
        alt="Avatar"
        className="img-thumbnail rounded-circle border border-2"
        style={{ width: "130px", height: "130px", objectFit: "cover" }}
      />
    </div>

    <form onSubmit={handleTmp}>
      {/* Thông tin cá nhân */}
      {[
        { label: "📝 Tên", value: user.name, name: "vname" },
        { label: "⚥ Giới tính", value: genderMap[user.sex] || "Chưa xác định", name: "vsex" },
        { label: "🎂 Ngày sinh", value: user.birthday, name: "vbirthday", type: "date" },
        { label: "📱 Số điện thoại", value: user.phonenumber, name: "vphonenumber" },
        { label: "📍 Địa chỉ", value: user.address, name: "vaddress" }
      ].map((field, index) => (
        <div className="mb-3" key={index}>
          <label className="form-label fw-semibold fs-5">{field.label}:</label>
          <input
            type={field.type || "text"}
            className="form-control"
            name={field.name}
            value={field.value || ""}
            readOnly
          />
        </div>
      ))}
    </form>

    {/* Nút chỉnh sửa và đổi mật khẩu */}
    <div className="text-center mt-3">
      <button className="btn btn-primary btn-md me-2 rounded-pill" onClick={() => setShowModal(true)}>
        <i className="bi bi-pencil"></i> Chỉnh sửa
      </button>
      <button className="btn btn-danger btn-md rounded-pill" onClick={() => setShowPasswordModal(true)}>
        <i className="bi bi-key"></i> Đổi mật khẩu
      </button>
    </div>
  </div>

  {/* Modal cập nhật thông tin */}
  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>✏️ Chỉnh sửa hồ sơ</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="text-center mb-3">
        <img src={preview || editUser.avatar} alt="Avatar" className="img-thumbnail rounded-circle" style={{ width: "120px", height: "120px" }} />
      </div>
      <Form onSubmit={handleUpdate}>
        <Form.Group>
          <Form.Label>📸 Ảnh đại diện</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
        </Form.Group>
        
        {/** Cập nhật thông tin cá nhân */}
      {[
        { label: "📝 Tên", name: "name", type: "text" },
        { label: "🎂 Ngày sinh", name: "birthday", type: "date" },
        { label: "📱 Số điện thoại", name: "phonenumber", type: "text" },
        { label: "📍 Địa chỉ", name: "address", type: "text" }
      ].map(({ label, name, type }) => (
        <Form.Group key={name}>
          <Form.Label style={{marginTop:"5px"}}>{label}</Form.Label>
          <Form.Control
            type={type}
            name={name}
            value={editUser[name] || ""}
            onChange={handleChange}
          />
        </Form.Group>
      ))}

        <Form.Group>
          <Form.Label style={{marginTop:"5px"}}>⚥ Giới tính</Form.Label>
          <Form.Select name="sex" value={editUser.sex} onChange={handleChange}>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3 w-100">
          <i className="bi bi-save"></i>  Cập nhật
        </Button>
      </Form>
    </Modal.Body>
  </Modal>

  {/* Modal đổi mật khẩu */}
  <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>🔒 Đổi mật khẩu</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleChangePassword}>
        <Form.Group>
          <Form.Label>🏷️ Tên người dùng</Form.Label>
          <Form.Control type="text" value={user.name} readOnly />
        </Form.Group>

           {/* Nhập mật khẩu mới */}
           <Form.Group>
              <Form.Label>🔑 Mật khẩu mới</Form.Label>
           <Form.Control
            type="password"
               name="password"
              value={passwords.password}
               onChange={handlePasswordChange}
               required
             />
            </Form.Group>

             {/* Nhập lại mật khẩu */}
            <Form.Group>
             <Form.Label>🔑 Nhập lại mật khẩu</Form.Label>
             <Form.Control
               type="password"
                 name="confirmPassword"
                 value={passwords.confirmPassword}
                 onChange={handlePasswordChange}
                 required
               />
             </Form.Group> 



        <Button variant="primary" type="submit" className="mt-3 w-100">
          <i className="bi bi-shield-lock"></i> Đổi mật khẩu
        </Button>
      </Form>
    </Modal.Body>
  </Modal>

  {/* Bootstrap Toast */}
  <ToastContainer position="top-center" className="p-4" style={{ zIndex: 9999 }}>
    <Toast onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={2000} autohide bg={toast.variant}>
      <Toast.Header>
        <strong className="me-auto">Thông báo</strong>
      </Toast.Header>
      <Toast.Body>{toast.message}</Toast.Body>
    </Toast>
  </ToastContainer>
</div>






  );
};

export default Profile;
