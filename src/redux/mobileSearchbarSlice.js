import { createSlice } from "@reduxjs/toolkit";

const mobileSearchbarSlice = createSlice({
    name: "showMobileSearchbar",
    initialState: {
        showMobileSearchbar: false
    },
    reducers: {
        toggleMobileSearchbar: (state) => {
            state.showMobileSearchbar = !state.showMobileSearchbar
        },
        hideMobileSearchbar: (state) => {
            state.showMobileSearchbar = false;
        }
    }
})
export const {toggleMobileSearchbar,hideMobileSearchbar} = mobileSearchbarSlice.actions;
export default mobileSearchbarSlice.reducer;
