import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveLoginInfo: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
    },
  },
});

export const { saveLoginInfo } = loginSlice.actions;

export default loginSlice.reducer;
