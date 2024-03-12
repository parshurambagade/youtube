import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import liveChatSlice from "./liveChatSlice";
import menuSlice from "./menuSlice";
import mobileSearchbarSlice from "./mobileSearchbarSlice";
import userSlice from "./userSlice";

const appStore = configureStore({
    reducer:{
        menu: menuSlice,
        search: searchSlice,
        liveChat: liveChatSlice,
        mobileSearchbar: mobileSearchbarSlice,
        user: userSlice
    }
})

export default appStore;