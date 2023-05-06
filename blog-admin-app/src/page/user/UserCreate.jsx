import React from "react";
import useCreateUser from "../blog/hooks/useCreateUser";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useGetAllRolesQuery } from "../../app/apis/userApi";
import { getRoles } from "../options/options";

function UserCreate() {
  const { data: RoleData, isLoading } = useGetAllRolesQuery();

  const { control, register, handleSubmit, errors, onCreateUser } =
    useCreateUser();

  if (isLoading) {
    return <h2>Loading .....</h2>;
  }

  const getRolesOptionl = getRoles(RoleData);

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onCreateUser)}>
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
                            {...register("name")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.name?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input id="email" {...register("email")} />
                          <p className="text-danger fst-italic mt-2">
                            {errors.email?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            id="password"
                            className="form-control"
                            rows="3"
                            {...register("password")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.password?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label>Roles</label>
                          <Controller
                            name="roleIds"
                            control={control}
                            defaultValue={[]}
                            render={({ field: { onChange, value, ref } }) => (
                              <div>
                                <Select
                                  placeholder="--Chọn Roles--"
                                  inputRef={ref}
                                  options={getRolesOptionl}
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

export default UserCreate;
