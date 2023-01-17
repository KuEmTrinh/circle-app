import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  members: "",
  isCircleAdmin: false,
};

export const circleSlice = createSlice({
  name: "circle",
  initialState,
  reducers: {
    saveCircleInfo: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    saveCircleMembers: (state, action) => {
      state.members = action.payload;
    },
    checkCircleAdmin: (state, action) => {
      state.isCircleAdmin = action.payload;
    },
  },
});

export const { saveCircleInfo, saveCircleMembers, checkCircleAdmin } =
  circleSlice.actions;

export default circleSlice.reducer;
