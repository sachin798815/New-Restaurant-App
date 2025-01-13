import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAdmin: localStorage.getItem("isAdmin")|| false,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token")||null,
  email: localStorage.getItem("email") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      if (action.payload.localId === "9Z8RB4BMUyPTVlXbyrCIJcUmMHG3") {
        state.isAdmin = true
        localStorage.setItem("isAdmin",true)
    }; 
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
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("name");
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
