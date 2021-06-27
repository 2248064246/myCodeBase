/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-27 23:07:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-27 23:51:42
 * @Description: 
 */


const __item = new WeakMap()

class Stack {
  constructor() {
    __item.set(this, []) // 将 this 映射为 [], 防止暴露数据
  }

  push(item) {
    return __item.get(this).push(item)
  }

  pop() {
    return __item.get(this).pop()
  }

  peek() {
    let len = __item.get(this).length
    return __item.get(this)[len - 1]
  }

  clear() {
    __item.set(this, [])
  }

  size() {
    return __item.get(this).length
  }

  isEmpty() {
    return this.size() === 0
  }

  toString(format) {
    return __item.get(this).reverse().join(format)
  }
}

export default Stack