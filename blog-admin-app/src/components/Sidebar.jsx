import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const { auth } = useSelector((state) => state.auth);

  const roles = auth.roles.map((role) => role.name);

  const isShowMenu = (authRoles, requireRoles) => {
    return authRoles.some((role) => requireRoles.includes(role));
  };

  return (
    <div className="sidebar">
      <div className="logo d-flex justify-content-center align-items-center">
        <h3 className="fs-4 text-white">ADMIN</h3>
      </div>
      <div className="menu">
        <div className="menu-item">
          <h5>
            <span className="d-inline-block me-1">
              <i className="fa-solid fa-chess"></i>
            </span>
            Quản lý bài viết
          </h5>
          <ul className="m-0 p-0">
            {isShowMenu(roles, ["ADMIN"]) && (
              <li>
                <Link to={"/admin/blogs"}>Danh sách bài viết</Link>
              </li>
            )}
            {isShowMenu(roles, ["ADMIN", "AUTHOR"]) && (
              <li>
                <Link to={"/admin/blogs/own-blogs"}>Bài viết của tôi</Link>
              </li>
            )}

            {isShowMenu(roles, ["ADMIN", "AUTHOR"]) && (
              <li>
                <Link to={"/admin/blogs/create"}>Tạo bài viết</Link>
              </li>
            )}
          </ul>
        </div>
        {isShowMenu(roles, ["ADMIN"]) && (
          <>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-explosion"></i>
                </span>
                Quản lý danh mục
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link to={"/admin/categories"}>Danh sách danh mục</Link>
                </li>
              </ul>
            </div>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-cookie-bite"></i>
                </span>
                Quản lý user
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <a href="#">Danh sách user</a>
                </li>
                <li>
                  <a href="#">Tạo user</a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
