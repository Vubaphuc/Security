import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/slice/authSlice";
import { useNavigate } from "react-router-dom";

function Headers() {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <nav className="d-flex justify-content-end align-items-center px-3">
      <div className="dropdown">
        <a
          className="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown link
        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
          <li>
            <button 
              className="btn"
              onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Headers;
