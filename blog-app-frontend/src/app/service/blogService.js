import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/public' }),
    endpoints: (builder) => ({
        getAllBlogPublicPage: builder.query({
            query: ({page,pageSize}) => `blog?page=${page}&pageSize=${pageSize}`,
        }),
        searchAllBlogPublicByTerm: builder.query({
            query: (term) => `search?term=${term}`,
        }),
        getBlogByIdAndBySlug: builder.query({
            query: ({blogId,blogSlug}) => `blog/${blogId}/${blogSlug}`
        }),
        getAllCategory: builder.query({
            query: () => "categories",
        }),
        getTopCategory: builder.query({
            query: () => "category/top5",
        }),
        getCategoryByName: builder.query({
            query: (categoryName) => `categories/${categoryName}`
        }),
    })
})

export const {
    useGetAllBlogPublicPageQuery,
    useGetBlogByIdAndBySlugQuery, 
    useSearchAllBlogPublicByTermQuery,
    useGetAllCategoryQuery,
    useGetTopCategoryQuery,
    useGetCategoryByNameQuery
} = blogApi