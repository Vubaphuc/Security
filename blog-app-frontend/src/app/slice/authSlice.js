import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../service/authApi';
import { getData, setData } from '../utils/localStrorageUtils';

const defaultState = {
    auth: null,
    token: null,
    isAuthenticated: false
}; // lấy ra trong localStrorage


const initialState = getData("authBlog") ? getData("authBlog") : defaultState

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // gọi endpoints thành công
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        // lưu tạm thời. nếu reset trang sẽ về mặc định
        state.auth = action.payload.auth;
        state.token = action.payload.token;
        state.isAuthenticated  = action.payload.isAuthenticated;


        // lưu vào trong localStrorage
        setData("authBlog", state);
    })
  }
});

export const {} = authSlice.actions

export default authSlice.reducer