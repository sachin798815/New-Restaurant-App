import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token")||null,
  email: localStorage.getItem("email") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
