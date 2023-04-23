import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/apis/authApi";

function LoginPage() {
  // TODO : Validate form trước lên gửi lên server
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  // Nếu đã login -> chuyển hướng sang trang homepage
  if (isAuthenticated) {
    return <Navigate to={"/admin/blogs/own-blogs"} />;
  }

  // Xử lý logic login
  const handleLogin = (e) => {
    e.preventDefault();

    login({ email, password })
      .unwrap()
      .then(() => {
        navigate("/admin/blogs/own-blogs");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <div className="login shadow p-5" style={{ width: 500 }}>
          <h1 className="mb-3 text-center">Đăng nhập</h1>
          <form onSubmit={handleLogin}>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Nhập email"
              required="required"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control mb-3"
              type="password"
              placeholder="Nhập password"
              required="required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-block">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
