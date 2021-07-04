# Symbol 类型

> symbol 是 ES6 新增的数据类型, 用来表示唯一的值

> 常用于给对象添加安全的属性, 可以在一定程度上实现私有属性

> 很多ES6 新增语言扩展机制, 都是使用 symbol 来实现

## 定义一个 Symbol

```js
// Symbol() 永远不会返回相同的值
let s = Symbol('test')
let t = Symbol('test')
s !== t  // true

```

## 定义共享的 Symbol

```js
let s = Symbol.for('test') 
// 如果存在 test 则返回存在的symbol, 否则返回新的symbol
let t = Symbol.for('test')

s === t // true

Symbol.keyFor(s) // => test 通过这个方法可以获取Symbol的值

```

