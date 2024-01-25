import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: "showMenu",
    initialState: {
        showMenu: true,
        showMobileMenu: false
    },
    reducers: {
        toggleMenu: (state) => {
            state.showMenu = !state.showMenu;
        },
        hideMenu: state => {
            state.showMenu = false;
        },
        toggleMobileMenu: (state) => {
            state.showMobileMenu = !state.showMobileMenu;
        },
        hideMobileMenu: state => {
            state.showMobileMenu = false;
        }
    }
})
export const {toggleMenu, hideMenu, toggleMobileMenu, hideMobileMenu} = menuSlice.actions; 
export default menuSlice.reducer;