import React from "react";
import { Link } from "react-router-dom"

function CategoryList() {
  return (
    <main className="main">
        <header className="page-header">
            <h1>Tags</h1>
        </header>
        <ul className="terms-tags">
            <li>
                <Link to={"/categories/java"}>Java
                    <sup><strong><sup>5</sup></strong></sup></Link>
            </li>
        </ul>
    </main>
  );
}

export default CategoryList;
