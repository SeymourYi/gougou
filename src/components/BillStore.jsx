// components/BillStore.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBillList } from '../store/billSlice';

export default function BillStore() {
  // 从 Redux store 获取数据
  const billList = useSelector(state => state.bill.billList);
  const dispatch = useDispatch();

  // 示例：更新账单列表
  const updateBills = () => {
    const newBills = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 }
    ];
    dispatch(setBillList(newBills));
  };

  return (
    <div>
      <button onClick={updateBills}>更新账单</button>
      <ul>
        {billList.map(bill => (
          <li key={bill.id}>账单金额: {bill.amount}</li>
        ))}
      </ul>
    </div>
  );
}