import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import authReducer from "./slice/authSlice";
import { blogApi } from "./apis/blogApi";
import { categoryApi } from "./apis/categoryApi";
import { userApi } from "./apis/userApi";

// Context API + useReducer có thể thay thế cho redux
const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            blogApi.middleware,
            categoryApi.middleware,
            userApi.middleware
        ),
});

export default store;