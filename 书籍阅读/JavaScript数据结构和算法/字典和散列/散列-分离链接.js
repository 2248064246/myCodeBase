/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-17 14:28:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-17 15:32:05
 * @Description: 
 */

class HashTable {
  constructor() {
    this.table = {}
  }

  /**
   * 推入数据进散列表, 如果存在则修改, 不存在则新增
   * @param {*} key 
   * @param {*} value 
   */
  set(key, value) {
    let hashCode = this.hashCode(key)
    if (this.table[hashCode] == undefined) {
      this.table[hashCode] = []
    }
    let item = this.table[hashCode].find(item => item.key === key)
    if (item) {
      item.value = value
    } else {
      this.table[hashCode].push({
        key,
        value
      })
    }
  }

  get(key) {
    let hashCode = this.hashCode(key)
    let positionAry = this.table[hashCode]
    if(!positionAry) return undefined
    if (positionAry.length > 1) {
      return positionAry.find(item => item.key === key)
    } else {
      let item = positionAry[0]
      return item.key === key ? item : undefined
    }
  }

  remove(key) {
    let hashCode = this.hashCode(key)
    let positionAry = this.table[hashCode]
    if (positionAry.length > 1) {
      let item = positionAry.splice(positionAry.findIndex(item => item.key === key), 1)
      return item.length !== 0
    } else {
      // positionAry = []
      delete this.table[hashCode]
      return true
    }

  }

  hashCode(value) {
    value = this.toStrFn(value)
    let h = 0;
    if (h == 0 && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        h = 31 * h + value.charCodeAt(i); // 31 * h == (hash << 5) - hash
        h |= 0; // 转换为32位
      }
    }
    return h;
  }

  /**
   * 将键值字符串化
   * @param {*} key 
   */
  toStrFn(key) {
    // null 和 undefined 没有toString() 方法
    if (key === null) {
      return 'null'
    } else if (key === undefined) {
      return 'undefined'
    } else if (key.toString() === '[object Object]') {
      // 对象的toString方法是判断数据类型的
      return JSON.stringify(key)
    }
    return key.toString()
  }
}

let t = new HashTable()
t.set('1', 1)
console.log(t.get('1'))
console.log(t.remove('1'))
console.log(t.get('1'))