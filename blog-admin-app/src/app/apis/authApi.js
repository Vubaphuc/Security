import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const END_POINT = "http://localhost:8080/api/v1";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: END_POINT }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "login-handle",
                method: "POST",
                body: data
            }),
        }),
    }),
});

export const {
    useLoginMutation
} = authApi;
