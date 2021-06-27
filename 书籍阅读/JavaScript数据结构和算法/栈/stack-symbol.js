/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-27 22:56:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-27 23:06:26
 * @Description: 
 */


const __item = Symbol('stackItem') 

class Stack {
  constructor() {
    this[__item] = [] // 通过 Symbol, 实例中无法直接获取stack数组
    this.length = 0
  }

  push(item) {
    return this[__item].push(item)
  }

  pop() {
    return this[__item].pop()
  }

  peek() {
    let len = this[__item].length
    return this[__item][len - 1]
  }

  clear() {
    this[__item] = []
  }

  size() {
    return this[__item].length
  }
}


export default Stack