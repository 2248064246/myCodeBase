

# Reflect 反射API

Reflect 是一个内置对象, 提供拦截JavaScript操作的方法

Reflect 不是一个构造函数, 不能使用new关键字, 就像Math一样

Reflect 提供的都是静态方法, 这些方法很类似或者相似Object, Function 上的方法


## 静态方法

`Reflect.apply(f, thisArgs, argumentsList)`
  + 同`f.apply(thisArgs, argumentsList)`

`Reflect.construct(target, argsList[, newTarget])`
  + `Reflect.construct(target, argsList)` 等同于 `new target(...argsList)`
  + 在传入 newTarget 之后, target中的 `new.target`会改为`newTarget`, 这个会改变 `instanceof` 操作符的结果

`Reflect.defineProperty(o, name, descriptor)`
  + 和`Object.defineProperty(o, name, descriptor)` 类似, 只是成功返回true, 失败返回false
  
`Reflect.deleteProperty(o, name)`
  + 从对象中删除一个属性, 类似`delete o[name]`, 同样成功返回true, 失败返回false

`Reflect.get(o, name[, receiver])`
  + 在没有指定 receiver 情况下类似 `o[name]`
  + 指定了 receiver, 如果name属性有 getter, 则getter中的this为receiver, 类似 `receiver[name]`

`Reflect.getOwnPropertyDescriptor(o, name)`
  + 类似于`Object.getOwnPropertyDescriptor(o, name)`, 用于获取属性描述

`Reflect.getPrototypeOf(o)`
  + 返回对象o的原型, 如果没有则返回 null. 如果o是原始值则会报错
  + `Object.getPrototypeOf(o)`如果是原始值, 则会包装为对象

`Reflect.has(o, name)`
  + 类似 `name in o`

`Reflect.isExtensible(o)`
  + 判断对象 o 是否可扩展

`Reflect.ownKeys(o)`
  + 返回对象 o 的所有自有属性数组(不会收到 enumerable 的影响)
  + 等同于 Object.getOwnPropertyNames() 和 Object.getOwnPropertySymbols() 的和

`Reflect.preventExtensions(o)`
  + 设置对象o为不可扩展

`Reflect.set(o, name, value[, receiver])`
  + 设置兑现属性值

`Reflect.setPrototypeOf(o, p)`
  + 设置对象o的原型为 p

