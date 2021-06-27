/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-27 23:16:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-28 00:19:53
 * @Description: 
 */


import Stack from "./stack-weakMap.js"

function decToAny(number, base) {
  if (!(base >= 2 && base <= 36)) throw new Error('进制必须在2~36之间')
  let stack = new Stack(),
    digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    str = ''
  let remain = number
  do {
    stack.push(Math.floor(remain % base)) // JS的计算不区分浮点和整形, 使用floor确保取得整数
    remain = Math.floor(remain / base)
  } while (remain > 0)
  while (!stack.isEmpty()) str += digits[stack.pop()]
  return str
}


function anyToDec(number, base) {
  if (!(base >= 2 && base <= 36)) throw new Error('进制必须在2~36之间')
  let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let dec = 0

  number.split('').reverse().forEach((item, index) => {
    let num = digits.indexOf(item)
    dec += num * Math.pow(base, index)
  })
  return dec
}

let a = decToAny(100345, 35)
console.log(a, anyToDec(a, 35))