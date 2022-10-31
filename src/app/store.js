import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../component/slice/loginSlice'
export const store = configureStore({
  reducer: {
    login: loginReducer,
    deleteLoginInformation:loginReducer,

  },
});
