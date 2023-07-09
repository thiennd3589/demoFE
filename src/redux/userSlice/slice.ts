import { UserModel } from "interface/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { userInfo?: UserModel } = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUserInfo: (state, action: { payload: UserModel; type: string }) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initUserInfo } = userSlice.actions;

export default userSlice.reducer;
