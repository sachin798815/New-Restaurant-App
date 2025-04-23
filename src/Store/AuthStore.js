import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: !!sessionStorage.getItem("token"),
  token: sessionStorage.getItem("token")||null,
  email: sessionStorage.getItem("email") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("name");
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
