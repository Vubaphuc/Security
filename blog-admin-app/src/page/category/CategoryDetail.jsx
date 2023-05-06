import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery
} from "../../app/apis/categoryApi";
import useUpdateCategory from "../blog/hooks/useUpdateCategory";
import { toast } from "react-toastify";

function CategoryDetail() {

  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [deleteCategory] = useDeleteCategoryMutation();

  const { data: categoryData, isLoading } = useGetCategoryByIdQuery(categoryId);

  const { register, handleSubmit, errors, onUpdateCategory } =
    useUpdateCategory(categoryId);

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  const handleDeleteCategory = (id) => {
      deleteCategory(id)
        .unwrap()
        .then(() => {
          toast.success("Xóa thành công")
          navigate("/admin/categories")
        })
        .catch((err) => alert(err.data.message))
  }

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onUpdateCategory)}>
            <div className="row py-2">
              <div className="col-6">
                <Link to={"/admin/categories"} className="btn btn-default">
                  <i className="fas fa-chevron-left"></i> Quay lại
                </Link>
                <button type="submit" className="btn btn-info px-4">
                  Lưu
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button type="button" className="btn btn-danger px-4" onClick={ () => handleDeleteCategory(categoryData?.id)} >
                  Xóa
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
                          <label>Tiêu đề</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            defaultValue={categoryData?.name}
                            onChange={(e) => {
                              categoryData.name = e.target.value;
                            }}
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

export default CategoryDetail;
