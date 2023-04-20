import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { blogApi } from "./service/blogService";
import { authApi } from "./service/authApi";
import authReducer from "./slice/authSlice"


export const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            blogApi.middleware,
            authApi.middleware
    ),
})