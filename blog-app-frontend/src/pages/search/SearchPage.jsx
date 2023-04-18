import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useSearchAllBlogPublicByTermQuery } from '../../app/service/blogService'

function SearchPage() {


    const [terms, setTerm] = useState("");


    const { data: blogData, isLoading: blogLoading, isError: blogIsError, error: blogError } = useSearchAllBlogPublicByTermQuery(terms);

    if (blogLoading) {
        return <h2>Loading....</h2>;
      }
    if (blogIsError) {
        return <h2>Error: {blogError}</h2>;
    }

    const handleSearchTermChange = (event) => {
        setTerm(event.target.value);
    };

  return (
    <main className="main">
    <header className="page-header">
        <h1>
            Search
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentcolor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        </h1>
        <div className="post-description">Tìm kiếm bài viết</div>
        <div className="post-meta"></div>
    </header>
    <div id="searchbox">
        <input
            id="searchInput"
            autoFocus
            placeholder="Tìm kiếm bài viết"
            type="search"
            autoComplete="off"
            onChange={handleSearchTermChange}
        />
        {blogData.map((blog) => (
        <ul id="searchResults" key={blog.id}>
            <li className="post-entry">
                <header className="entry-header">
                    {blog.title}&nbsp;»
                </header>
                <Link
                    to={`/blog/${blog.id}/${blog.slug}`}
                    aria-label={blog.title}
                ></Link>
            </li>
        </ul>
        ))}
    </div>
</main>
  )
}

export default SearchPage