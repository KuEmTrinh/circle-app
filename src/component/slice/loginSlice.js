import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
  login: false,
  role: [],
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveLoginInfo: (state, action) => {
      state.data = action.payload;
      state.login = true;
    },
    saveUserRole: (state, action) => {
      state.role = [...action.payload];
    },
    deleteUserInfo: (state) => {
      state.data = "";
      state.login = false;
    },
  },
});

export const { saveLoginInfo, deleteUserInfo, saveUserRole } =
  loginSlice.actions;

export default loginSlice.reducer;
