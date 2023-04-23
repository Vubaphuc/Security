import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../apis/authApi';
import { getData, setData } from '../../utils/localStorageUtils';

const defaultState = {
    auth: null,
    token: null,
    isAuthenticated: false
}

const initialState = getData("authBlog")
    ? getData("authBlog")
    : defaultState

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state = defaultState;

            // lưu vào trong localStorage
            setData("authBlog", state)

            return state;
        }
    },
    // những tác động từ bên ngoài thay đổi state
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.auth = action.payload.auth;
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.isAuthenticated;

            // lưu vào trong localStorage
            setData("authBlog", state)
        })
    }
});
// export logout ra. nếu cần dùng thì gọi.
export const { logout } = authSlice.actions

export default authSlice.reducer