import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
  login: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveLoginInfo: (state, action) => {
      state.data = action.payload;
      state.login = true;
    },
    deleteUserInfo: (state) => {
      state.data = "";
      state.login = false;
    },
  },
});

export const { saveLoginInfo, deleteUserInfo } = loginSlice.actions;

export default loginSlice.reducer;
