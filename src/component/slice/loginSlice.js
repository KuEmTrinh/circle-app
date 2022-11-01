import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveLoginInfo: (state, action) => {

      state.data = action.payload;
    },

  },
}, {
  name: "deleteLoginInformation",
  initialState,
  reducers: {
    deleteLoginInfor: (state, action) => {
      console.log("hellu logout")
      state.data = action.payload;
    }
  }
});

export const { saveLoginInfo,deleteLoginInfor } = loginSlice.actions;

export default loginSlice.reducer;
