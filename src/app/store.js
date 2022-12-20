import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../component/slice/loginSlice'
import circleReducer from '../component/slice/circleSlice'
export const store = configureStore({
  reducer: {
    login: loginReducer,
    circle: circleReducer,
  },
});
