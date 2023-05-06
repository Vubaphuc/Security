import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useLazyGetAllUserQuery } from "../../app/apis/userApi";
import { Controller } from "react-hook-form";
import Select from "react-select";

function UserList() {
  const [getUsers, { data: userData, isLoading }] = useLazyGetAllUserQuery();
  // useEffect phải chạy giao diện trước mới gọi tới useEffect
  useEffect(() => {
    getUsers({
      page: 1,
      pageSize: 10,
    });
  }, []);

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  console.log(userData);

  const handlePageClick = (page) => {
    console.log(page);
  };



  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row py-2">
            <div className="col-12">
              <Link to={"/admin/users/create"} className="btn btn-primary">
                <i className="fas fa-plus"></i> Tạo Mới
              </Link>
              <Link to={""} className="btn btn-info">
                <i className="fas fa-redo"></i> Refresh
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData &&
                        userData.content.map((user) => (
                          <tr>
                            <td>
                              <Link to={`/admin/users/${user.id}`}>{user?.name}</Link>
                            </td>
                            <td>
                              <Link to={`/admin/users/${user.id}`}>{user.email}</Link>
                            </td>
                            <td>
                                {user.roles.map((role) => role.name).join(", ")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div
                    className="d-flex justify-content-center mt-3"
                    id="pagination"
                  >
                    <ReactPaginate
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={userData?.totalPages}
                      previousLabel="< previous"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserList;
