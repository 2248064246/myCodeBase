/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-07-26 18:25:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-27 22:16:27
 * @Description: 
 */

let item = Symbol('my-set')

class MySet {
  constructor(elements) {
    this[item] = {}
    elements && elements.forEach(ele => this.add(ele))
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this[item], element)
  }

  size() {
    return Object.keys(this[item]).length
  }

  add(element) {
    if (!this.has(element)) {
      this[item][element] = element
    }
    return this.size()
  }

  delete(element) {
    if (this.has(element)) {
      delete this[item][element]
    }
    return this.size()
  }

  clear() {
    this[item] = {}
  }

  values() {
    return Object.values(this[item])
  }
  forEach(fn) {
    this.values().forEach(fn)
  }

  [Symbol.iterator]() {
    var index = -1;
    var data = this.values();

    return {
      next: () => ({
        value: data[++index],
        done: !(index in data)
      })
    };
  }
}


module.exports = MySet