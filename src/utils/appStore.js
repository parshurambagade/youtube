import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import searchSlice from "./searchSlice";
import liveChatSlice from "./liveChatSlice";

const appStore = configureStore({
    reducer:{
        menu: menuReducer,
        search: searchSlice,
        liveChat: liveChatSlice
    }
})

export default appStore;