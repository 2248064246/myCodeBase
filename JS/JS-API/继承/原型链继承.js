/*
 * @Author: 洛水赋神
 * @Date: 2020-11-09 14:50:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-09 15:40:24
 * @Description: 
 * @Email: 2248064246@qq.com
 * @Company: 3xData
 * @youWant: add you want
 */


// * 首先先了解 new 关键字做了什么

// * 关于 new 关键字
// 1. 首先创建一个空对象, 并将构造函数中的this指向这个空对象
// 2. 将这个对象的原型指向构造函数的原型
// 3. 执行构造函数, 并将这个对象返回

// * 关于 constructor 参数
// 1. 这个参数位于 Object.prototype.constructor
// 2. 这个参数指向当前实例的构造函数的引用

// * 开始原型链继承
function A () {
  this.name = 'a'
  this.friend = ['Tom']
}
A.prototype.getName = function () {
  console.log('my name is:', this.name)
}

function B (name) {
  this.name = name
}
B.prototype = new A()       // 这里 B的prototype 指向的是 A实例的 __proto__. A的私有属性并没有实际意义, 不会被继承

// 这里对 constructor 操作
B.prototype.constructor = B // 在 __proto__ 上并没有constructor 属性, 直接给他设置是不会影响 __proto__ 指向的 A的prototype
B.prototype.rename = function(rename) { // 同样支持B自己的原型方法
  this.name = rename
}

var c = new B('c')
c.getName() // =? my name is: c

console.log(c.constructor)            // => 如果不做任何处理, 结果是 A. 然鹅正真意义上应该是 B
console.log(A.prototype.constructor)  // => 此时 A 原型上的构造者指向的还是 A
console.log(c.__proto__.name)         // => 这里返回 'a'
c.rename('cc')
c.getName() // => 改名成功

var d = new B('d')
d.getName()
d.friend.push('Tony') 

console.log(c.friend) // => 这里friend被所有的实例引用了, 导致任一实例修改,其他的实例也会变化


// * 来说说 优缺点
// 优点
//    可以继承父类的原型方法, 子类可以添加自己的原型方法
// 缺点
//    父类的的私有属性虽然会被继承, 但是没办法动态传参修改
//    对于父类中的引用值, 所有子类实例都会被引用并且任一修改会引起所有实例变化