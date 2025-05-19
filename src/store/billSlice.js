// stores/billSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios  from 'axios';
const billSlice = createSlice({
  name: 'bill', // 必须添加 slice 名称
  initialState: {
    billList: []
  },
  reducers: {
    setBillList: (state, action) => {
      state.billList = action.payload;
    }
  }
});
const getBillList =  () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/posts")
    dispatch(setBillList(res))
}
  }
 export {getBillList }
export const { setBillList } = billSlice.actions;
export default billSlice.reducer;