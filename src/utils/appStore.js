import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import searchSlice from "./searchSlice";

const appStore = configureStore({
    reducer:{
        menu: menuReducer,
        search: searchSlice
    }
})

export default appStore;