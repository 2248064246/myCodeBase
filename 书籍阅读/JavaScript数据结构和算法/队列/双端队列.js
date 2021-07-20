/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-07-05 21:17:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-05 21:43:52
 * @Description: 
 */

let items = Symbol('items')

class Queue {
  constructor() {
    this[items] = []
  }

  addFront(item) {
    return this[items].unshift(item)
  }
  addBack(item) {
    return this[items].push(item)
  }

  removeFront() {
    return this[items].shift()
  }

  removeBack() {
    return this[items].pop()
  }

  peekFront() {
    let front = this.removeFront()
    this.addFront(front)
    return front
  }
  peekBack() {
    let back = this.removeBack()
    this.addBack(back)
    return back
  }
  size() {
    return this[items].length
  }
  isEmpty() {
    return this.size() === 0
  }
}

export default Queue