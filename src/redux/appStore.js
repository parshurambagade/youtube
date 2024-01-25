import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import liveChatSlice from "./liveChatSlice";
import menuSlice from "./menuSlice";
import mobileSearchbarSlice from "./mobileSearchbarSlice";

const appStore = configureStore({
    reducer:{
        menu: menuSlice,
        search: searchSlice,
        liveChat: liveChatSlice,
        mobileSearchbar: mobileSearchbarSlice
    }
})

export default appStore;