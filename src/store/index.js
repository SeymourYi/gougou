// stores/index.js
import { configureStore } from '@reduxjs/toolkit';
import billReducer from './billSlice';

export const store = configureStore({
  reducer: {
    bill: billReducer // 注意这里的 key 要和 useSelector 中的一致
  }
});