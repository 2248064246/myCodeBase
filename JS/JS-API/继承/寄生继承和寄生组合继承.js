/*
 * @Author: 洛水赋神
 * @Date: 2020-11-09 16:31:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-09 16:49:09
 * @Description: 
 * @Email: 2248064246@qq.com
 * @Company: 3xData
 * @youWant: add you want
 */

// * 首先需要了解 Object.create() 都做了什么
// Object.create(prototypeObj)
//    1. 首先创建一个新的对象
//    2. 将这个对象的原型 = 传入的对象
//    3. 返回这个新对象

// * Object.create() 方法专门用来做原型链的继承, 它可以取消父类的私有属性 在 new 的时候添加到继承链中去

// * 看代码 (寄生组合继承)
function A(name) {
  this.name = name
  this.friend = ['Tom']
}
A.prototype.getName = function () {
  console.log('my name is: ', this.name)
}

function B(name) {
  A.call(this, name)
}
B.prototype = Object.create(A.prototype) // * 此处就是寄生继承(和原型链到的区别在于不需要 new 关键字)
// * 为什么不直接指向 A.prototype, 原因是那样的话 B和A的关联就太大了, B类上无法写自己的方法和属性, 所有的在B.prototype 上的修改都会直接作用域 A.prototype
// * 也叫做虚弱和 B的原型和A的原型之间的关联
B.prototype.constructor = B

var c = new B('c')
var d = new B('c')
c.getName()
d.getName()
c.friend.push('Tony')
console.log(c.friend, d.friend)
console.log(c.constructor, d.constructor) // * 这个依旧需要做特殊处理
console.log(c instanceof A, d instanceof A)