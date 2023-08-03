import { createSlice } from "@reduxjs/toolkit";

const initialState: { visible: boolean } = {
  visible: false,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setVisible: (state, action: { payload: boolean; type: string }) => {
      state.visible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVisible } = boardSlice.actions;

export default boardSlice.reducer;
