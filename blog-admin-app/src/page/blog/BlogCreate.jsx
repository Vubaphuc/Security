import React from "react";
import { getCategoryOptions, getStatus } from "../options/options";
import { useGetAllCategoryQuery } from "../../app/apis/categoryApi";
import { Controller } from "react-hook-form";
import Select from "react-select";
import useCreate from "./hooks/useCreate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { blogsSchema } from "./schemas/schemas";
import { Link } from "react-router-dom";

function BlogCreate() {
  const { control, register, handleSubmit, errors, onCreateBlog } = useCreate();

  const resolver = yupResolver(blogsSchema);

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: categoryError,
  } = useGetAllCategoryQuery({
    page: 1,
    pageSize: 10,
  });

  if (isLoadingCategory) {
    return <h2>Loading....</h2>;
  }
  if (isErrorCategory) {
    return <h2>Error: {categoryError}</h2>;
  }

  const statusOptions = getStatus();
  const categoryOptions = getCategoryOptions(categoryData.content);

  return (
    <section className="content">
      <div className="container-fluid">
        <form onSubmit={handleSubmit(onCreateBlog)}>
          <div className="row py-2">
            <div className="col-6">
              <Link to={"/admin/blogs/own-blogs"} className="btn btn-default">
                <i className="fas fa-chevron-left"></i> Quay lại
              </Link>
              <button type="submit" className="btn btn-info px-4">
                Lưu
              </button>
              <button className="btn btn-primary px-4">Preview</button>
            </div>

            <div className="col-6 d-flex justify-content-end">
              <button type="button" className="btn btn-danger px-4">
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
                          defaultValue={statusOptions[0].value}
                          rules={{ resolver }}
                          render={({ field }) => (
                            <div>
                            <Select
                              {...field}
                              placeholder="--chọn hình thưc--"
                              options={statusOptions}
                              value={statusOptions.find(
                                (c) => c.value === field.value
                              )}
                              onChange={(val) => field.onChange(val.value)}
                            />
                            {errors.type && (
                              <p className="text-danger fst-italic mt-2">
                                {errors.type.message}
                              </p>
                            )}
                          </div>
                          )}
                        />
                      </div>
                      <div className="form-group">
                        <label>Danh mục</label>
                        <Controller
                          name="categoryIds"
                          control={control}
                          defaultValue={[]}
                          rules={{ resolver }}
                          render={({ field: { onChange, value, ref } }) => (
                            <div>
                              <Select
                                placeholder="--Chọn danh mục--"
                                inputRef={ref}
                                options={categoryOptions}
                                value={categoryOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(val) =>
                                  onChange(val.map((c) => c.value))
                                }
                                isMulti
                              />
                              {errors.categoryIds?.message && (
                                <p className="text-danger fst-italic mt-2">
                                  {errors.categoryIds.message}
                                </p>
                              )}
                            </div>
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

export default BlogCreate;
