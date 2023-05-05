import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const END_POINT = "http://localhost:8080/api/v1/admin";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: END_POINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // lấy trong state;
      // nếu tồn tại token  => set
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ page, pageSize }) => `blogs?page=${page}&pageSize=${pageSize}`,
    }),
    getOwnBlogs: builder.query({
      query: ({ page, pageSize }) =>
        `blogs/own-blogs?page=${page}&pageSize=${pageSize}`,
    }),
    getBlogById: builder.query({
      query: (id) => `blogs/${id}`,
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "blogs",
        method: "POST",
        body: data,
      }),
    }),
    deleteBlogById: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),
    }),
    updateBlogById: builder.mutation({
      // đây là cách tách id ra khỏi data.
      query: ({ id, ...data }) => ({
        url: `blogs/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useLazyGetBlogsQuery,
  useGetOwnBlogsQuery,
  useLazyGetOwnBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useDeleteBlogByIdMutation,
  useUpdateBlogByIdMutation
} = blogApi;
