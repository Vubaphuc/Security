import React from "react";
import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../../app/apis/blogApi";
import Select from "react-select";
import { getCategoryOptions, getStatus } from "../options/options";
import { useGetAllCategoryQuery } from "../../app/apis/categoryApi";

function BlogDetails() {
  const { blogId } = useParams();

  console.log(blogId);

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

  if (isLoadingBlog || isLoadingCategory) {
    return <h2>Loading....</h2>;
  }

  if (isErrorBlog) {
    return <h2>Error: {blogError}</h2>;
  }

  if (isErrorCategory) {
    return <h2>Error: {categoryError}</h2>;
  }

  const defaulCategory = blogData.categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  console.log(categoryData);

  const statusOptions = getStatus();
  const categoryOptions = getCategoryOptions(categoryData.content);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row py-2">
          <div className="col-6">
            <button type="button" className="btn btn-default">
              <i className="fas fa-chevron-left"></i> Quay lại
            </button>
            <button type="button" className="btn btn-info px-4">
              Lưu
            </button>
            <button type="button" className="btn btn-primary px-4">
              Preview
            </button>
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
                        defaultValue={blogData?.title}
                      />
                    </div>

                    <div className="form-group">
                      <label>Nội dung</label>
                      <textarea
                        id="content"
                        defaultValue={blogData.content}
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label>Mô tả ngắn</label>
                      <textarea
                        id="description"
                        className="form-control"
                        rows="3"
                        defaultValue={blogData.description}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <Select
                        defaultValue={{
                          label: blogData.status ? "Công Khai" : "Nháp",
                          value: blogData.status ? "Công Khai" : "Nháp",
                        }}
                        options={statusOptions}
                      />
                    </div>
                    <div className="form-group">
                      <label>Danh mục</label>
                      <div className="select2-purple">
                        <Select 
                            isMulti 
                            defaultValue={defaulCategory} 
                            options={categoryOptions}
                        />
                      </div>
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
      </div>
    </section>
  );
}

export default BlogDetails;
