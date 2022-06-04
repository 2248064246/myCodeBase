# Symbol 介绍

> symbol 是 ES6 新增的数据类型, 用来表示唯一的值

> 常用于给对象添加安全的属性, 可以在一定程度上实现私有属性

> 很多 ES6 新增语言扩展机制, 都是使用 symbol 来实现

## 注意

围绕原始数据类型创建一个显式包装器对象从 ECMAScript 6 开始不再被支持。 然而，现有的原始包装器对象，如 new Boolean、new String 以及 new Number，因为遗留原因仍可被创建。

```js
var sym = new Symbol(); // TypeError

/* BigInt 也是如此 */
```

如果你真的想创建一个 Symbol 包装器对象 (Symbol wrapper object)，你可以使用 Object() 函数：

```js
var sym = Symbol('foo');
typeof sym; // "symbol"
var symObj = Object(sym);
typeof symObj; // "object"

/* 两者也是宽松相等的 */
sym == symObj; // true
```

## 查找 Symbol 属性

> symbol 属性是无法被 for...in 或 Object.keys() 枚举获取的

查找 symbol 属性需要使用 Object.getOwnPropertySymbols() 方法, 得到 symbol 属性数组



## 全局 Symbol 

JS 有很多全局的 Symbol, 也可以注册自己的全局Symbol

使用 Symbol.for() 和 Symbol.keyFor() 注册和获取全局symbol



