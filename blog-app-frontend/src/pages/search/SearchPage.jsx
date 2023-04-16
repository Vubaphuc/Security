import React from 'react'
import { Link } from "react-router-dom"

function SearchPage() {
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
        />
        <ul id="searchResults">
            <li className="post-entry">
                <header className="entry-header">
                    Truyền dữ liệu giữa React Components&nbsp;»
                </header>
                <Link
                    to={"/blogs/1/abc"}
                    aria-label="Truyền dữ liệu giữa React Components"
                ></Link>
            </li>
        </ul>
    </div>
</main>
  )
}

export default SearchPage