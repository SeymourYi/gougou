import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from "react"
import {billTypeToName}from "../../../../content/index"
import Icon from '../../../../components/icons'
const DailyBill = ({ date, billList }) => {
  const overview = useMemo(() => {
      const income = billList?.filter(item => item.type === 'income')
        .reduce((a, c) => a + c.money, 0)
      const pay = billList?.filter(item => item.type === 'pay')
        .reduce((a, c) => a + c.money, 0)
      return {
        income,
        pay,
        total: income - pay
      }
  }, [billList])
  const [visable,setVisable]=useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          {visable ?
            <span className={classNames('arrow','expand')} onClick={() => { setVisable(!visable) }}></span>
            :
            <span className={classNames('arrow')} onClick={() => { setVisable(!visable) }}></span>
          }
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{overview.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{overview.income}</span>
          </div>
          <div className="balance">
            <span className="money">{overview.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{display:visable? 'block':'none'}}>
  {billList.map(item => {
    return (
      <div className="bill" key={item.id}>
        <Icon type={item.useFor}/>
        <div className="detail">
          <div className="billType">{billTypeToName[item.useFor]}</div>
        </div>
        <div className={classNames('money', item.type)}>
          {item.money.toFixed(2)}
        </div>
      </div>
    )
  })}
</div>
    </div>
  )
}
export default DailyBill