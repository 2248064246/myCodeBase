/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-07-07 22:58:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-09 17:05:00
 * @Description: 
 */


class Node {
  constructor(element) {
    this.value = element
    this.next = undefined
  }
}

class LinkList {
  constructor() {
    this.head = new Node()
  }
  static __checkPosition(position) {
    if (typeof position !== 'number') throw Error('position 必须是一个数字')
    return position < 0 ? -position : position
  }
  insertAt(element, position) {
    let index = LinkList.__checkPosition(position)
    if (index <= this.size()) {
      let node = new Node(element)
      let preNode = index - 1 >= 0 ? this.getAt(index - 1) : this.head
      let nextNode = preNode.next
      preNode.next = node
      node.next = nextNode
    } else {
      throw Error('position 超过链表长度')
    }
  }

  removeAt(position) {
    let index = LinkList.__checkPosition(position)
    if (index <= this.size()) {
      let curNode = this.getAt(index)
      let preNode = this.getAt(index - 1)
      preNode.next = curNode.next
      // curNode.next = null
    }
  }

  push(element) {
    this.insertAt(element, this.size())
  }

  pop() {
    this.removeAt(this.size() - 1)
  }

  shift() {
    this.removeAt(0)
  }

  unshift(element) {
    this.insertAt(element, 0)
  }

  getAt(position) {
    let index = LinkList.__checkPosition(position)
    let length = 0
    let node = this.head.next
    while (node && node.next && length < index) {
      node = node.next
        ++length
    }
    return node
  }

  size() {
    let length = 0
    let node = this.head
    while (node && node.next) {
      node = node.next
        ++length
    }
    return length
  }

  isEmpty() {
    return this.size() === 0
  }

  toString() {
    let str = ''
    let node = this.head
    let length = 0
    while (node && node.next) {
      node = node.next
      str += ++length >= this.size() ? node.value : node.value + ','
    }
    return str
  }
}


let list = new LinkList()
let ary = [1, 2, 3]
ary.forEach(item => {
  list.push(item)
})

console.log(list.size(), list.getAt(0), list.insertAt('xxx', 3))
console.log(list.pop(), list.removeAt(1), list.toString())
console.log(list.unshift(5), list.toString())