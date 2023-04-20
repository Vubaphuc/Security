import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  useGetAllBlogPublicPageQuery,
  useGetAllCategoryQuery,
} from "../../app/service/blogService";

function HomePage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useGetAllCategoryQuery();

  const {
    data: blogData,
    isLoading: blogIsLoading,
    isError: blogIsError,
    error: blogError,
  } = useGetAllBlogPublicPageQuery({page,pageSize});

  if (categoryLoading || blogIsLoading) {
    return <h2>Loading....</h2>;
  }

  if (categoryIsError) {
    return <h2>Error : {categoryError}</h2>;
  }

  if (blogIsError) {
    return <h2>Error : {blogError}</h2>;
  }

  console.log(blogData);

  const totalPages = Math.ceil(blogData.totalItems / pageSize);
  console.log(totalPages)

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <main className="main">
        <header className="entry-header">
          <h1>
            <span
              style={{
                display: "inline-block",
                transform: "rotateY(180deg)",
              }}
            >
              🐈
            </span>
            Blog app <span>🐈</span>
          </h1>
        </header>
        <ul className="terms-tags top-tags">
          {categoryData.map((category) => (
            <li key={category.id}>
              <Link to={`categories/${category.name}`}>
                {category.name}
                <sup>
                  <strong>
                    <sup>{category.used}</sup>
                  </strong>
                </sup>
              </Link>
            </li>
          ))}
        </ul>
        {blogData.data.map((blog) => (
          <article className="post-entry" key={blog.id}>
            <header className="entry-header">
              <h2>{blog.title}</h2>
            </header>
            <div className="entry-content">
              <p>{blog.content}</p>
            </div>
            <footer className="entry-footer">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </footer>
            <Link
              className="entry-link"
              aria-label="post link to Hướng dẫn tạo tài khoản và sử dụng ChatGPT chỉ với 1 cốc trà đá"
              to={`/blog/${blog.id}/${blog.slug}`}
            ></Link>
          </article>
        ))}
        <div className="pagination">
          <button
            className="btn btn-left"
            onClick={goToPreviousPage}
            style={{ display: page === 1 ? "none" : "block" }}
          >
            « Trang trước
          </button>
          <button
            className="btn btn-right"
            onClick={goToNextPage}
            style={{ display: page === totalPages ? "none" : "block" }}
          >
            Trang tiếp theo »
          </button>
        </div>
      </main>
    </>
  );
}

export default HomePage;