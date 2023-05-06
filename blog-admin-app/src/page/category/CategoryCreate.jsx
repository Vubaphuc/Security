import React from "react";
import { Link } from "react-router-dom";
import useCreateCategory from "../blog/hooks/useCreateCategory";

function CategoryCreate() {
  const { register, handleSubmit, onCreateCategory, errors } =
    useCreateCategory();

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onCreateCategory)}>
            <div className="row py-2">
              <div className="col-6">
                <Link to={"/admin/categories"} className="btn btn-default">
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
                            id="title"
                            {...register("name")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.name?.message}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4"></div>
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

export default CategoryCreate;
