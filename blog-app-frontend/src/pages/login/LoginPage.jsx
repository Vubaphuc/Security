import React, { useState } from "react";
import "./Login.css";
import { useLoginMutation } from "../../app/service/authApi";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  console.log(isAuthenticated)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  // nếu đã login thành công => không chuyển về trang login được nữa. chuyển hướng tới trang khác
  if (isAuthenticated) {
    // dùng thẳng thư viện cần thêm to và truyền vào là 1 object { to: "trang cần chuyển hướng"}
    return <Navigate to={"/"}/>
  }

  const handleLogin = (event) => {
    event.preventDefault();

    login({ email, password })
      .unwrap()
      .then(() => {
        alert("Login thành công");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nhập Email"
          required="required"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nhập Password"
          required="required"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-block btn-large">
          Let me in.
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
