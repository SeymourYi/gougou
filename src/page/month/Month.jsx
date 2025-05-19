import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import _, { groupBy, keys } from "lodash"
import dayjs from 'dayjs'
import DailyBill from "./components/daybill/index"
const Month = () => {
  const [dataVisible, setDataVisible] = useState(false)
  const [currentMonthList,setCurrentMonthList]=useState([])
  const [currentdate, setCurrentdate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })
  const billList=useSelector(state=>state.bill.billList)
  const montGroup= useMemo(() => {
   return  _.groupBy(billList,(item)=>dayjs(item.date).format('YYYY-MM'))
  },[billList])
  const dayGroup = useMemo(() => {
    const groupData= _.groupBy(currentMonthList,(item)=>dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupData)
    return  {keys,groupData}
   },[currentMonthList])
  // 初始化和修改currentdate时更新currentMonthList
  useEffect(() => {
    if (montGroup[currentdate]) {
      setCurrentMonthList(montGroup[currentdate])
    }
    
  }, [currentdate, montGroup])

  const handConfirm = (data) => {
    setDataVisible(false)
    const formtDate = dayjs(data.toISOString()).format('YYYY-MM')
    setCurrentdate(formtDate)
  }

  const overview = useMemo(() => {
    const income = currentMonthList?.filter(item => item.type === 'income')
      .reduce((a, c) => a + c.money, 0)
    const pay = currentMonthList?.filter(item => item.type === 'pay')
      .reduce((a, c) => a + c.money, 0)
    return {
      income,
      pay,
      total: income - pay
    }
  }, [currentMonthList])
  // 初始化时设置当前月份的账单列表，无需重复操作
  // 已经在上面的useEffect中处理了currentdate变化的情况
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
              <span className="money">{overview.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{overview.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{overview.total}</span>
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
        {dayGroup.keys.map(key => {
          return <DailyBill key={key} date={ key} billList={dayGroup.groupData[key]} />
        })}
       
      </div>
    </div >
  )
}

export default Month