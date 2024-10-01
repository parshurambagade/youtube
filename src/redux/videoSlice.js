import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videosList: [],
    videoInfo: {},
  },
  reducers: {
    addVideos: (state, action) => {
      state.videosList = action.payload;
    },
    addVideoInfo: (state, action) => {
      state.videoInfo = action.payload;
    },
  },
});
export const { addVideos,  addVideoInfo } = videoSlice.actions;
export default videoSlice.reducer;
