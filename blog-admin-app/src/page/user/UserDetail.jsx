import React from "react";
import useUpdateUser from "../blog/hooks/useUpdateUser";
import { Link, useParams } from "react-router-dom";
import { useGetAllRolesQuery, useGetUserByIdQuery } from "../../app/apis/userApi";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { getRoles } from "../options/options";

function UserDetail() {

  const { userId } = useParams();

  const { data: userData, isLoading: isUsers } = useGetUserByIdQuery(userId);
  const { data: roleData, isLoading: isRoles } = useGetAllRolesQuery();


  const { control, register, handleSubmit, errors, onUpdateUser } = useUpdateUser(userId);

  if (isUsers || isRoles) {
    return <h2>Loading.....</h2>
  }


  const getRolesOptionl = getRoles(roleData);
  const defaultRoles = getRoles(userData?.roles);




  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onUpdateUser)}>
            <div className="row py-2">
              <div className="col-6">
                <Link to={"/admin/users"} className="btn btn-default">
                  <i className="fas fa-chevron-left"></i> Quay lại
                </Link>
                <button type="submit" className="btn btn-info px-4">
                  Lưu
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            defaultValue={userData?.name}
                            {...register("name")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.name?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input id="email" defaultValue={userData?.email} {...register("email")} />
                          <p className="text-danger fst-italic mt-2">
                            {errors.email?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label>Roles</label>
                          <Controller
                            name="roleIds"
                            control={control}
                            defaultValue={userData.roles.map((e) => e.id)}
                            render={({ field: { onChange, value, ref } }) => (
                              <div>
                                <Select
                                  placeholder="--Chọn Roles--"
                                  inputRef={ref}
                                  options={getRolesOptionl}
                                  defaultValue={defaultRoles}
                                  onChange={(val) =>
                                    onChange(val.map((c) => c.value))
                                  }
                                  isMulti
                                />
                                {errors.roleIds?.message && (
                                  <p className="text-danger fst-italic mt-2">
                                    {errors.roleIds.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default UserDetail;
