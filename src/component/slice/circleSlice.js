import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
};

export const circleSlice = createSlice({
  name: "circle",
  initialState,
  reducers: {
    saveCircleInfo: (state, action) => {
      console.log(action.payload);
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { saveCircleInfo } = circleSlice.actions;

export default circleSlice.reducer;
