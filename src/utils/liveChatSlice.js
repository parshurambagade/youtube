import { createSlice } from "@reduxjs/toolkit";

const liveChatSlice = createSlice({
    name: "liveChat",
    initialState: [],
    reducers: {
        addChat:(state, action) => { 
            state.length > 10 && state.shift();
            state.push({name:action.payload.name, text:action.payload.text, profilePic: action.payload.profilePic})
        }
    }   
});

export const {addChat} = liveChatSlice.actions;
export default liveChatSlice.reducer;