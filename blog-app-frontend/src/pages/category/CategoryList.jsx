import React from "react";
import { Link } from "react-router-dom"
import { useGetAllCategoryQuery } from "../../app/service/blogService";

function CategoryList() {

  const { data: categoryData, isLoading: categoryIsLoading} = useGetAllCategoryQuery();

  if (categoryIsLoading) {
    return <h2>Loading....</h2>;
  }

  return (
    <main className="main">
        <header className="page-header">
            <h1>Tags</h1>
        </header>
        <div className="listUl">
        {categoryData.map((category) => (
        <ul className="terms-tags">
            <li>
                <Link to={`/categories/${category.name}`}>Java
                    <sup><strong><sup>{category.used}</sup></strong></sup></Link>
            </li>
        </ul>
        ))}
        </div>
    </main>
  );
}

export default CategoryList;
