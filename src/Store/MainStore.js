import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthStore";

const MainStore=configureStore({
    reducer:{
        auth:authReducer,
    }
})

export default MainStore;