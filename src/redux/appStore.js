import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import liveChatSlice from "./liveChatSlice";
import menuSlice from "./menuSlice";
import mobileSearchbarSlice from "./mobileSearchbarSlice";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";

const appStore = configureStore({
    reducer:{
        menu: menuSlice,
        search: searchSlice,
        liveChat: liveChatSlice,
        mobileSearchbar: mobileSearchbarSlice,
        user: userSlice,
        videos: videoSlice
    }
})

export default appStore;