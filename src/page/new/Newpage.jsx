import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '../../components/icons/index'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '../../content/index'
import {  useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {addBillList} from '../../store/billSlice'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
const NewPage = () => {
  const [billtype,setType]=useState('pay')
  const [money,setmoney]=useState(0)
  const [dteVisable,setDateVisable]=useState(false)
  const navigate = useNavigate()
  const [userfor, setUserfor] = useState('')
  const [slelctdate, setSlelctdate] = useState(new Date())
  const dispath=useDispatch()
  const savebill = () => {
    const data = {
      type:billtype,
      money: billtype === 'pay' ? -money : +money,
      date: slelctdate,
      userfor:userfor
    }
    console.log(data);
    dispath(addBillList(data))
  }
  const dateconfim = (valeu) => {
    setSlelctdate(valeu)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billtype==='pay'? 'selected':'')}
            onClick={() => {
              setType('pay')
            }}
          >
            支出
          </Button>
          <Button
              className={classNames(billtype==='income'? 'selected':'')}
            shape="rounded"
            onClick={() => {
              setType('income')
            }}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={()=>setDateVisable(true)}>{dayjs(slelctdate).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dteVisable}
                onConfirm={dateconfim}
                onCancel={()=>setDateVisable(false) }
                onClose={ ()=>setDateVisable(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(value)=>{setmoney(value)}}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billtype==="income"?'income':'pay'].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        userfor===item.type?'selected':''
                      )}
                      key={item.type}
                      onClick={() => {
                       setUserfor(item.type)
                     }}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={savebill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default NewPage