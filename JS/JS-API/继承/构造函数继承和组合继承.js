/*
 * @Author: 洛水赋神
 * @Date: 2020-11-09 15:57:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-09 16:19:51
 * @Description: 
 * @Email: 2248064246@qq.com
 * @Company: 3xData
 * @youWant: add you want
 */

// * 首先要了解 Function.prototype.call() || bind() || apply() 的作用及区别
// bind(thisArg [, arg1, arg2...])
//    将目标函数的this 替换为 thisArg(想要的this), 并支持传入目标函数对应的形参
//    返回 一个重写了this和形参的函数
// call(thisArg[, arg1, arg2...])
//    前面和bind类似, 只是它会立即执行当前函数, 返回值是被执行函数的返回值
// apply(thisArg, [argArray])
//    和call类似, 只是参数类别替换为了参数数组, 允许将参数写为一个数组形式传入

// * 开始构造函数继承和组合
function A(name = 'a') {
  this.name = name;
  this.friend = ['Tom']
}
A.prototype.getName = function () {
  console.log('my name is: ', this.name)
}

function B(name) {
  A.call(this, name)        // 这里将 A中的私有属性this改为 B => 相当于把A中的代码拿到B中执行
  // 所以, 不会造成原型链继承中到的问题 => 引用继承问题 (在这里再次创建了一次A中的代码)
}

// * 构造函数继承在上面已经完成, 仅仅是继承父类的私有属性
// * 下面是结合原型继承而实现的组合继承
B.prototype = new A()       // 然鹅, 实际上在 B 的原型上, A的私有属性还是继承了下来, 并且所有实例也都会继承. 只是B中有有一份一样的, 导致实例无法获取而已
B.prototype.constructor = B

var c = new B('c')
var d = new B('d')
c.getName()
d.getName()
c.friend.push('Tony')
d.friend.push('Jim')
console.log(c.friend, d.friend)
console.log(c.constructor, d.constructor)
console.log(c instanceof B, d instanceof B)