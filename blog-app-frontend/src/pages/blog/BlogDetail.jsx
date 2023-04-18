import React from "react";
import { useGetBlogByIdAndBySlugQuery } from "../../app/service/blogService";
import { useParams } from "react-router-dom";

function BlogDetail() {
  const { blogId } = useParams();
  const { blogSlug } = useParams();

  console.log(blogId)
  console.log(blogSlug)

  const { data: blogData, isLoading: blogLoading } = useGetBlogByIdAndBySlugQuery({blogId,blogSlug});
  console.log(blogData)
  console.log(blogId)
  console.log(blogSlug)

  if (blogLoading) {
    return <h2>Loading....</h2>;
  }

  console.log(blogData)

  return (
    <main className="main">
        <article className="post-single">
          <header className="post-header">
            <h1 className="post-title">{blogData?.title}</h1>
            <div className="post-meta">
              <span>{new Date(blogData?.createdAt).toLocaleDateString()}</span>
            </div>
          </header>
          <div className="post-content">
          <p>{blogData?.content}</p>
          </div>
        </article>
    </main>
  );
}

export default BlogDetail;
