import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080'}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "login-handle",
                method: "POST",
                body: data,
            })
        }),
    })
})

export const {
    useLoginMutation
} = authApi