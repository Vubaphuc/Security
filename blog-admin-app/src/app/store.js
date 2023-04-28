import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import authReducer from "./slice/authSlice";
import { blogApi } from "./apis/blogApi";
import { categoryApi } from "./apis/categoryApi";

// Context API + useReducer có thể thay thế cho redux
const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            blogApi.middleware,
            categoryApi.middleware
        ),
});

export default store;