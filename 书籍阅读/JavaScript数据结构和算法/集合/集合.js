/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-07-26 18:25:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-26 18:44:00
 * @Description: 
 */

let item = Symbol('my-set')

class MySet {
  constructor(elements) {
    this[item] = {}
    elements.forEach(ele => this.add(ele))
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
}


let set = new MySet([1, 2, 3, 4, 5, 4, 5, 2, 3, 2, 12])

console.log(set.values())
console.log(set.delete(12), set.values())
console.log(set.has(3), set.values())
console.log(set.clear(), set.size())