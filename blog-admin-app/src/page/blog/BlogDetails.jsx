import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBlogByIdMutation,
  useGetBlogByIdQuery,
} from "../../app/apis/blogApi";
import Select from "react-select";
import { getCategoryOptions, getStatus } from "../options/options";
import { useGetAllCategoryQuery } from "../../app/apis/categoryApi";
import { Controller } from "react-hook-form";
import useUpdate from "./hooks/useUpdate";

function BlogDetails() {

  const { blogId } = useParams();

  const navigate = useNavigate();

  const {
    data: blogData,
    isLoading: isLoadingBlog,
    isError: isErrorBlog,
    error: blogError,
  } = useGetBlogByIdQuery(blogId);

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: categoryError,
  } = useGetAllCategoryQuery({
    page: 1,
    pageSize: 10,
  });

  const [deleteBlog] = useDeleteBlogByIdMutation();

  const { control, register, handleSubmit, errors, onUpdate } =
    useUpdate(blogId);

  if (isLoadingBlog || isLoadingCategory) {
    return <h2>Loading....</h2>;
  }

  if (isErrorBlog) {
    return <h2>Error: {blogError}</h2>;
  }

  if (isErrorCategory) {
    return <h2>Error: {categoryError}</h2>;
  }

  console.log(blogData.id)

  const defaultStatus = {
    label: blogData.status === true ? "Công khai" : "Nháp",
    value: blogData.status,
  };

  const statusOptions = getStatus();
  const categoryOptions = getCategoryOptions(categoryData.content);
  const defaultCategory = getCategoryOptions(blogData.categories)

  const handleDelete = (id) => {
    deleteBlog(id)
      .unwrap()
      .then(() => navigate("/admin/blogs"))
      .catch((err) => alert(err.data.message));
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <form onSubmit={handleSubmit(onUpdate)}>
          <div className="row py-2">
            <div className="col-6">
              <button className="btn btn-default">
                <i className="fas fa-chevron-left"></i> Quay lại
              </button>
              <button type="submit" className="btn btn-info px-4">
                Lưu
              </button>
              <button className="btn btn-primary px-4">Preview</button>
            </div>

            <div className="col-6 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-danger px-4"
                onClick={() => handleDelete(blogData.id)}
              >
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
                          id="title"
                          value={blogData?.title}
                          {...register("title")}
                        />
                        <p className="text-danger fst-italic mt-2">
                          {errors.title?.message}
                        </p>
                      </div>

                      <div className="form-group">
                        <label>Nội dung</label>
                        <textarea
                          id="content"
                          value={blogData?.content}
                          {...register("content")}
                        ></textarea>
                        <p className="text-danger fst-italic mt-2">
                          {errors.content?.message}
                        </p>
                      </div>

                      <div className="form-group">
                        <label>Mô tả ngắn</label>
                        <textarea
                          id="description"
                          className="form-control"
                          rows="3"
                          value={blogData?.description}
                          {...register("description")}
                        ></textarea>
                        <p className="text-danger fst-italic mt-2">
                          {errors.description?.message}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Trạng thái</label>
                        <Controller
                          name="status"
                          control={control}
                          defaultValue={defaultStatus.value}
                          render={({ field }) => (
                            <div>
                              <Select
                                {...field}
                                placeholder="--Chọn trạng thái--"
                                options={statusOptions}
                                defaultValue={defaultStatus}
                                value={statusOptions.find(
                                  (c) => c.value === field.value
                                )}
                                onChange={(val) => field.onChange(val.value)}
                              />
                            </div>
                          )}
                        />
                      </div>
                      <div className="form-group">
                        <label>Danh mục</label>
                        <Controller
                          name="categoryIds"
                          control={control}
                          defaultValue={blogData.categories.map((e) => e.id)}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              placeholder="--Chọn danh mục--"
                              inputRef={ref}
                              options={categoryOptions}
                              defaultValue={defaultCategory}
                              value={categoryOptions.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) =>
                                onChange(val.map((c) => c.value))
                              }
                              isMulti
                            />
                          )}
                        />
                      </div>
                      <div className="form-group">
                        <div className="thumbnail-preview-container mb-3">
                          <img src="" alt="" id="thumbnail" />
                        </div>
                        <button
                          type="button"
                          className="btn btn-info btn-flat"
                          data-toggle="modal"
                          data-target="#modal-xl"
                        >
                          Chọn hình ảnh
                        </button>
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
  );
}

export default BlogDetails;
