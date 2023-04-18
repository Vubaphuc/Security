import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { blogApi } from "./service/blogService";


export const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            blogApi.middleware,

    ),
})