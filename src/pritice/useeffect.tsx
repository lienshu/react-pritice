import React, { Fragment, useEffect } from 'react'
import { useMemo, useState } from 'react'

// 产品名称列表
const nameList = ['apple', 'peer', 'banana', 'lemon']

const Example = (props) => {
  // 产品名称、价格
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('apple')

  // 假设有一个业务函数  获取产品的名字
  function getProductName() {
    console.log('getProductName触发')
    return name
  }

  useEffect(() => {
    console.log('name变化了')
    getProductName()
  }, [name])

  useEffect(() => {
    console.log('price变化了')
  }, [price])

  // 点击修改名字时，打印结果
  // getProductName触发
  // name变化了
  // getProductName触发

  // 解析打印顺序
  // 因为修改了DOM，触发了getProductName方法
  // 随后调用name的effect
  // effect中调用了getProductName方法

  // 官网解释：当调用useEffect时，它会在每次渲染后调用，也就是完成对DOM的更改后运行”副作用“函数
  // 当DOM发生变化时，不相关的函数不需要触发，而effect只能在DOM更新后触发，所以需要使用useMemo
  return (
    <Fragment>
      <p>{name}</p>
      <p>{price}</p>
      <p>{getProductName()}</p>
      <button onClick={() => setPrice(price + 1)}>价钱+1</button>
      <button onClick={() => setName(nameList[(Math.random() * nameList.length) << 0])}>
        修改名字
      </button>
    </Fragment>
  )
}
export default Example
