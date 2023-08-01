import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
  login: false,
  role: [],
  circleList: [],
  token: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveLoginInfo: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      state.login = true;
    },
    saveUserRole: (state, action) => {
      state.role = [...action.payload];
    },
    deleteUserInfo: (state) => {
      state.data = "";
      state.token = "";
      state.login = false;
    },
    saveCircleList: (state, action) => {
      state.circleList = action.payload;
      console.log(state.circleList);
    },
    saveLDAPToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {
  saveLoginInfo,
  deleteUserInfo,
  saveUserRole,
  saveCircleList,
  saveLDAPToken,
} = loginSlice.actions;

export default loginSlice.reducer;
