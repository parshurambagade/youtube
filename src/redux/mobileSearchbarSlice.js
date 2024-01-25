import { createSlice } from "@reduxjs/toolkit";

const mobileSearchbarSlice = createSlice({
    name: "showMobileSearchbar",
    initialState: {
        showMobileSearchbar: false
    },
    reducers: {
        toggleMobileSearchbar: (state) => {
        
            state.showMobileSearchbar = !state.showMobileSearchbar
        }
    }
})
export const {toggleMobileSearchbar} = mobileSearchbarSlice.actions;
export default mobileSearchbarSlice.reducer;
