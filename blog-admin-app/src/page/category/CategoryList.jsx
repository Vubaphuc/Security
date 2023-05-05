import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../app/apis/categoryApi";

function CategoryList() {


  const { data: categoryData, isLoading, isError, error } = useGetAllCategoryQuery({ page: 1, pageSize: 10});
  // useEffect phải chạy giao diện trước mới gọi tới useEffect







  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>Error: {error}</h2>
  }

  console.log(categoryData);


  return (
    <main className="main">
      <header className="page-header">
        <h1>Tags</h1>
      </header>
      <div className="listUl">
        {categoryData.content.map((category) => (
          <ul className="terms-tags">
            <li>
              <Link to={`/admin/categories/${category.name}`}>
                <sup>
                  <strong>
                    <sup>{category?.name}</sup>
                  </strong>
                </sup>
              </Link>
            </li>
          </ul>
        ))}
      </div>
    </main>
  );
}

export default CategoryList;
