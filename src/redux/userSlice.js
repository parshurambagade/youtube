import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null, 
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
});

export const {login, logout, setToken} = userSlice.actions;
export default userSlice.reducer;