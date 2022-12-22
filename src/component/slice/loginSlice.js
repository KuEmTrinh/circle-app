import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
  login: false,
  role: [],
  circleList: [],
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
      state.login = false;
    },
    saveCircleList: (state, action) => {
      state.circleList = action.payload;
      console.log(state.circleList);
    },
  },
});

export const { saveLoginInfo, deleteUserInfo, saveUserRole, saveCircleList } =
  loginSlice.actions;

export default loginSlice.reducer;
