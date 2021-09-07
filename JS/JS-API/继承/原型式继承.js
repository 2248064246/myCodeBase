/*
 * @Author: 洛水赋神
 * @Date: 2020-11-09 16:23:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-09 16:30:10
 * @Description: 
 * @Email: 2248064246@qq.com
 * @Company: 3xData
 * @youWant: add you want
 */


// * 直接开始

var A = {
  name: 'a',
  friend: ['Tom'],
  getName: function() {
    console.log('my name is: ', this.name)
  }
}

function B (name) {
  this.name = name
}
B.prototype = A
B.prototype.constructor = B

var c = new B('c')
var d = new B('d')
c.getName()
d.getName()
c.friend.push('Tony')
console.log(c.friend, d.friend)           // => [ 'Tom', 'Tony' ] [ 'Tom', 'Tony' ]
console.log(c.constructor, d.constructor)
console.log(c instanceof B, d instanceof B)

// * 和原型链的区别就在于父类是一个对象, 而不是函数
// * 其他的原型链一模一样, 除了 instanceof 无法判断 A, 因为A不是一个构造函数

