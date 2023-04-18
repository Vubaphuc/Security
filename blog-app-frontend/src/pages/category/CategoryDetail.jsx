import React from "react";
import { Link, useParams } from "react-router-dom"
import { useGetCategoryByNameQuery } from "../../app/service/blogService";

function CategoryDetail() {
  const { categoryName } = useParams();

  console.log(categoryName);

  const { data: blogData, isLoading: blogLoading, isError: blogIsError, error: blogError } = useGetCategoryByNameQuery(categoryName);
  console.log(blogData);

  if (blogLoading) {
    return <h2>Loading....</h2>;
  }
  if (blogIsError) {
    return <h2>Error: {blogError}</h2>;
  }

  return (
    <>
      <header className="entry-header">
        <h1 style={{ marginBottom: "1rem" }}>Tag : {categoryName}</h1>
      </header>
      <main className="main">
        {blogData.map((blog) => (
          <article className="post-entry" key={blog?.id}>
            <header className="entry-header">
              <h2>{blog?.title}</h2>
            </header>
            <div className="entry-content">
              <p>{blog?.content}</p>
            </div>
            <footer className="entry-footer">
              <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
            </footer>
            <Link
              className="entry-link"
              to={`/blog/${blog?.id}/${blog?.slug}`}
            >
              Read More
            </Link>
          </article>
        ))}
      </main>
    </>
  );
}

export default CategoryDetail;
