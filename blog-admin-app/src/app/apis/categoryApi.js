import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const END_POINT = "http://localhost:8080/api/v1/admin";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: END_POINT,
        prepareHeaders: (headers, { getState }) => {
          const token = getState().auth.token // lấy trong state;
          // nếu tồn tại token  => set
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: ({page,pageSize}) => `categories?page=${page}&pageSize=${pageSize}`,
        }),
        getCategoryById: builder.query ({
            query: (id) => `categories/${id}`
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: "categories",
                method: "POST",
                body: data,
            }),
        }),
        updateCategory: builder.mutation({
            query: ({id,...data}) => ({
                url: `categories/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: "DELETE",  
            }),
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useLazyGetAllCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryByIdQuery,
    useLazyGetCategoryByIdQuery
} = categoryApi;