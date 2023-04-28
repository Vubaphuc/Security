import React, { useEffect } from "react";
import { useLazyGetBlogsQuery } from "../../app/apis/blogApi";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function BlogList() {

  // nếu dùng useLazy để gọi APi thì cần phải sử dụng useEffect để render ra dữ liệu
  const [getBlogs, { data: blogPage, isLoading }] = useLazyGetBlogsQuery();

  // useEffect phải chạy giao diện trước mới gọi tới useEffect
  useEffect(() => {
    getBlogs({
      page: 1,
      pageSize: 10,
    });
  }, []);

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  console.log(blogPage);

  const handlePageClick = (page) => {
    console.log(page); //  {selected: 0}
    getBlogs({
      page: page.selected + 1,
      pageSize: 10,
    });
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row py-2">
            <div className="col-12">
              <button type="button" className="btn btn-primary">
                <i className="fas fa-plus"></i> Viết bài
              </button>
              <button type="button" className="btn btn-info">
                <i className="fas fa-redo"></i> Refresh
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Danh mục</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPage &&
                        blogPage.data.map((blog) => (
                          <tr key={blog.id}>
                            <td>
                              <Link to={`/admin/blogs/${blog.id}`}>
                                {blog.title}
                              </Link>
                            </td>
                            <td>
                              <a href="#">{blog.user.name}</a>
                            </td>
                            <td>
                              {blog.categories.map((c) => c.name).join(", ")}
                            </td>
                            <td>{blog.status ? "Công khai" : "Nháp"}</td>
                            <td>
                              {new Date(blog.createdAt).toLocaleDateString()}
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
                      pageCount={blogPage?.totalPages}
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

export default BlogList;
