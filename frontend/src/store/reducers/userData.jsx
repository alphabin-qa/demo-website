import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userData = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userData.actions;
export default userData.reducer;
