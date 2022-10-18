import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../component/slice/loginSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
  },
});
