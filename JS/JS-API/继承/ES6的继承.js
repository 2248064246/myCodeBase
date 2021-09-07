/*
 * @Author: 洛水赋神
 * @Date: 2020-11-09 16:51:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-09 16:59:04
 * @Description: 
 * @Email: 2248064246@qq.com
 * @Company: 3xData
 * @youWant: add you want
 */

const { timeStamp } = require("console")

// * ES6 中新增加了 class 关键字用于继承操作


class A {
  constructor(name) { // 构造函数, 构造私有属性
    this.name = name
    this.friend = ['Tom']
  }
  getName() { // 原型链公共方法
    console.log('my name is: ', this.name)
  }
}

class B extends A { // 定义 B 继承自 A
  constructor(name) {
    super(name) // 调用父类的构造函数
  }
  rename(name) { // 在自身的原型上增加公共方法
    this.name = name
  }
}

var c = new B('c')
var d = new B('d')
c.getName()
d.getName()
c.rename('cc')
c.getName()
c.friend.push('Tony')
console.log(c.friend, d.friend)
console.log(c.constructor, d.constructor)
console.log(c instanceof A, c instanceof B)
