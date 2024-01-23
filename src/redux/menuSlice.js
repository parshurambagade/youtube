import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: "showMenu",
    initialState: {
        showMenu: true
    },
    reducers: {
        toggleMenu: (state) => {
            state.showMenu = !state.showMenu;
        },
        hideMenu: state => {
            state.showMenu = false;
        }
    }
})
export const {toggleMenu, hideMenu} = menuSlice.actions; 
export default menuSlice.reducer;