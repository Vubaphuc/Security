import React from "react";
import {
  useGetAllCommentByBlogIdQuery,
  useGetBlogByIdAndBySlugQuery,
} from "../../app/service/blogService";
import { useParams } from "react-router-dom";

function BlogDetail() {
  const { blogId } = useParams();
  const { blogSlug } = useParams();

  const {
    data: blogData,
    isLoading: blogLoading,
    isError: blogIsError,
    error: blogError,
  } = useGetBlogByIdAndBySlugQuery({ blogId, blogSlug });

  const {
    data: commentData,
    isLoading: commentIsLoading,
    isError: commentIsError,
    error: commentError,
  } = useGetAllCommentByBlogIdQuery(blogId);

  if (blogLoading || commentIsLoading) {
    return <h2>Loading....</h2>;
  }
  if (blogIsError) {
    return <h2>Error: {blogError}</h2>;
  }

  if (commentIsError) {
    return <h2>Error: {commentError}</h2>;
  }

  const getTimeAgoString = (createdAt) => {
    // tính time từ hiện tại đến thời điểm bình luận
    const timeAgoInMs = new Date().getTime() - new Date(createdAt).getTime();

    // tính số giờ
    const hoursAgo = Math.floor(timeAgoInMs / 3600000);

    //
    if (hoursAgo < 1) {
      // tính số phút
      const minutesAgo = Math.floor(timeAgoInMs / 60000);

      return `${minutesAgo} phút trước`;

    } else if (hoursAgo < 24) {

      return `${hoursAgo} giờ trước`;

    } else {
      // tính số ngày
      const daysAgo = Math.floor(hoursAgo / 24);

      if (daysAgo === 1) {

        return `1 ngày trước`;

      } else {
        
        return `${daysAgo} ngày trước`;
      }
    }
  };

  return (
    <>
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
        <div className="comment-box">
          <h3>
            <span id="comment-count">{commentData.length}</span> bình luận
          </h3>
          <form>
            <label for="comment"></label>
            <textarea
              name="comment"
              id="comment"
              cols="10"
              rows="10"
              placeholder="Viết bình luận"
            ></textarea>
            <button type="submit">Gửi bình luận</button>
          </form>
          <div className="comments">
            {commentData.map((comment) => (
              <div className="comment" key={comment?.id}>
                <h4 className="name">{comment?.user.name}</h4>
                <p className="text">{comment?.content}</p>
                <span className="timestamp">
                  {getTimeAgoString(comment.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default BlogDetail;
