import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useLazyGetAllCategoryQuery } from "../../app/apis/categoryApi";

function CategoryList() {

  const [getCategory, { data: categoryData, isLoading }] = useLazyGetAllCategoryQuery();
  // useEffect phải chạy giao diện trước mới gọi tới useEffect
  useEffect(() => {
    getCategory({
      page: 1,
      pageSize: 10,
    });
  }, []);

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

console.log(categoryData)

  const handlePageClick = (page) => {
    getCategory({
      page: page.selected + 1,
      pageSize: 10,
    });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row py-2">
          <div className="col-12">
            <Link to={"/admin/categories/create"} className="btn btn-primary">
              <i className="fas fa-plus"></i> Tạo Mới
            </Link>
            <Link to={"/admin/categories"} className="btn btn-info">
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
                      <th>ID Danh Mục</th>
                      <th>Tên Danh Mục</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData &&
                     categoryData.content.map((category) => (
                    <tr key={category?.id}>
                      <td>
                        <Link to={`/admin/categories/${category?.id}`}>{category?.id}</Link>
                      </td>
                      <td>
                        <Link to={`/admin/categories/${category?.id}`}>{category?.name}</Link>
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
                    pageCount={categoryData?.totalPages}
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
  );
}

export default CategoryList;
