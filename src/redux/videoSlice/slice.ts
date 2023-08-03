import { createSlice } from "@reduxjs/toolkit";

const initialState: { mainSession?: string } = {};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setMainSession: (state, action: { payload: string; type: string }) => {
      state.mainSession = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMainSession } = videoSlice.actions;

export default videoSlice.reducer;
