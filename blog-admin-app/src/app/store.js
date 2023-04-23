import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import authReducer from "./slice/authSlice";
import { blogApi } from "./apis/blogApi";

// Context API + useReducer có thể thay thế cho redux
const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            blogApi.middleware
        ),
});

export default store;