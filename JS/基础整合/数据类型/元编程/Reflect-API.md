# Reflect 反射 API

Reflect 是一个内置对象, 提供拦截 JavaScript 操作的方法

Reflect 不是一个构造函数, 不能使用 new 关键字, 就像 Math 一样

Reflect 提供的都是静态方法, 这些方法很类似或者相似 Object, Function 上的方法

## 作用

- 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方
- 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则会返回 false。
- 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为。

```js
// 老写法
'assign' in Object; // true



// 新写法
Reflect.has(Object, 'assign'); // true
```

- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

```js
Proxy(target, {
  set: function (target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  },
});
```

## 静态方法

`Reflect.apply(f, thisArgs, argumentsList)`

- 同`f.apply(thisArgs, argumentsList)`

`Reflect.construct(target, argsList[, newTarget])`

- `Reflect.construct(target, argsList)` 等同于 `new target(...argsList)`
- 在传入 newTarget 之后, target 中的 `new.target`会改为`newTarget`, 这个会改变 `instanceof` 操作符的结果

`Reflect.defineProperty(o, name, descriptor)`

- 和`Object.defineProperty(o, name, descriptor)` 类似, 只是成功返回 true, 失败返回 false

`Reflect.deleteProperty(o, name)`

- 从对象中删除一个属性, 类似`delete o[name]`, 同样成功返回 true, 失败返回 false

`Reflect.get(o, name[, receiver])`

- 在没有指定 receiver 情况下类似 `o[name]`
- 指定了 receiver, 如果 name 属性有 getter, 则 getter 中的 this 为 receiver, 类似 `receiver[name]`

`Reflect.getOwnPropertyDescriptor(o, name)`

- 类似于`Object.getOwnPropertyDescriptor(o, name)`, 用于获取属性描述

`Reflect.getPrototypeOf(o)`

- 返回对象 o 的原型, 如果没有则返回 null. 如果 o 是原始值则会报错
- `Object.getPrototypeOf(o)`如果是原始值, 则会包装为对象

`Reflect.has(o, name)`

- 类似 `name in o`

`Reflect.isExtensible(o)`

- 判断对象 o 是否可扩展

`Reflect.ownKeys(o)`

- 返回对象 o 的所有自有属性数组(不会收到 enumerable 的影响)
- 等同于 Object.getOwnPropertyNames() 和 Object.getOwnPropertySymbols() 的和

`Reflect.preventExtensions(o)`

- 设置对象 o 为不可扩展

`Reflect.set(o, name, value[, receiver])`

- 设置兑现属性值

`Reflect.setPrototypeOf(o, p)`

- 设置对象 o 的原型为 p
