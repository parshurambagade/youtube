import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";

const appStore = configureStore({
    reducer:{
        menu: menuReducer
    }
})

export default appStore;