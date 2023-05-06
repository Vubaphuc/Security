import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const END_POINT = "http://localhost:8080/api/v1/admin";

export const userApi = createApi({
    reducerPath: "userApi",
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
        getAllUser: builder.query({
            query: ({page,pageSize}) => `users?page=${page}&pageSize=${pageSize}`,
        }),
        getUserById: builder.query ({
            query: (id) => `users/${id}`
        }),
        getAllRoles: builder.query ({
            query: () => "roles"
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: "users",
                method: "POST",
                body: data,
            }),
        }),
        updateUser: builder.mutation({
            query: ({id,...data}) => ({
                url: `users/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAllUserQuery,
    useLazyGetAllUserQuery,
    useCreateUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useGetAllRolesQuery
} = userApi;