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
    },
    addBill(state,action) {
      state.billList.push(action.payload)
    }

  }
});
const getBillList =  () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/get")
    dispatch(setBillList(res.data))
}
}
const addBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/get",data)
    dispatch(addBill(res.data))
    }
  }
 export {getBillList,addBillList }
export const { setBillList,addBill } = billSlice.actions;
export default billSlice.reducer;