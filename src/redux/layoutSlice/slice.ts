import { createSlice } from "@reduxjs/toolkit";

const initialState: { [key: string]: boolean } = {
  fullscreen: false,
  nothing: true,
  grid: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setLayout: (
      state,
      action: { payload: "nothing" | "grid" | "fullscreen"; type: string }
    ) => {
      for (let layout in state) {
        if (layout === action.payload) {
          state[layout] = true;
        } else {
          state[layout] = false;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
