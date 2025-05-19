import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import {  useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const Month = () => {

  const [dataVisible, setDataVisible] = useState(false)
  const [currentdate, setCurrentdate] = useState(() => {
  return new Date().toISOString().slice(0,7)
  })
  const BillList=useSelector(state=>state.bill.BillList)
  const montGroup= useMemo(() => {
   return  BillList
  },[BillList])
  console.log('====================================');
  console.log(montGroup);
  console.log('====================================');
  const handConfirm = (data) => {
    setDataVisible(false)
    setCurrentdate(data.toISOString().slice(0,7))
  }
  
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => {
            setDataVisible(true)
          }}>
            <span className="text">
             {currentdate+'账单'}
            </span>
            { dataVisible?<span className='arrow'></span>:<span className='arrow expand'></span> }
         
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dataVisible}
            max={new Date()}
            onCancel={() => {
              setDataVisible(false)
            }}
            onConfirm={
              handConfirm
            }
            onClose={() => {
              setDataVisible(false)
            }}
          />
        </div>
      </div>
    </div >
  )
}

export default Month