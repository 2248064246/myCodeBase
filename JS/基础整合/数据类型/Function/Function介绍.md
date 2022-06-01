# Function 介绍

Function 在 JS 中是非常重要的一类类型. 函数是 JS 中的第一等公民.

- 函数声明默认会提升
- 类基于函数

Function 的原型上有三个非常重要的方法:

- bind
- apply
- call

这三个方法都能够改变单前执行函数内部的 this 指向

## Function 构造函数

Function 构造函数有点特别, 它可以和`eval`一样动态创建和执行传入的字符串;

> 将构造函数作为函数调用（不使用运算符）与将其作为构造函数调用具有相同的效果

**语法**

```js
new Function(functionBody);
new Function(arg1, functionBody);
new Function(arg1, ...argN, functionBody);
```

arg1 ~ argN 表示函数参数

functionBody 表示函数体

示例

```js
const sum = new Function('a', 'b', 'return a + b');

console.log(sum(2, 6)); // 8
```

与 `eval` 的区别

1. Function 构造函数创建的函数只能在全局作用域中运行, 也就是说无法获取这个构造函数所在私有作用域的变量值

```js
var s = 'xxx';
var w = 'zzz';
function a() {
  let s = 'hello';
  let w = 'word';
  /* 这里 s 也是获取的全局变量... */
  /* 此时this是window */
  let say = new Function(s, 'console.log(s, w, "this", this); return s + w;');
  say(); // xxx zzz
}

a();
```

如果要使用局部作用域的变量, 需要换一种写法

```js
var s = 'xxx';
var w = 'zzz';
function a() {
  let s = 'hello';
  let w = 'word';
  /* 这里 s 也是获取的全局变量... */
  let say = new Function(
    'return function(s, w) {console.log(s, w, "this", this); return s + w;}'
  );
  /* 通过这种方式传入私有作用域的值 */
  say().call(this, s, w); // hello word
}

a();
```

2. Function 构造函数总是返回一个函数, 而`eval` 是执行一段代码

> Function 的安全问题相较于 `eval` 更小, 但是总体差不多

## 关于限制这类脚本执行

如果设置了`Content-Security-Policy`, 但是没有指定 `unsafe-eval` 则此类函数无法运行(包括 Function 和 eval)

```json
可以运行不安全函数
Content-Security-Policy: script-src 'self' 'unsafe-eval'
```

## 函数中 arguments 属性

> 这是一个类数组

arguments 是对函数参数的跟踪, 如果改变 arguments, 函数参数值也会更改. 改变函数参数值, arguments 值也会更改

```js
function a(n) {
  arguments[0] = 10;
  console.log(n); // 10

  n = 20;
  console.log(arguments[0]); // 20
}

a(1);
```

但是, 如果函数中包含 `剩余参数` 或 `默认参数` 或 `解构赋值` 那么 arguments 不会跟踪参数的值

```js
function a(n = 1) {
  console.log(arguments[0]); // undefined, 不会跟踪带默认值的参数...
  arguments[0] = 10;
  console.log(n); // 1

  n = 20;
  console.log(arguments[0]); // 这里会是 10, 而不是20
}

a();
```

但是在`严格模式`下, `剩余参数` `默认参数` `解构赋值` 并不会影响 `arguments` 的行为

```js

/* 这里居然会报错,  use strict 不允许放在带有默认参数, 解构赋值 的函数顶部*/
function a(n = 3) {
  'use strict';
  console.log(arguments[0]) // undefined, 不会跟踪带默认值的参数...
  arguments[0] = 10;
  console.log(n); // 1

  n = 20;
  console.log(arguments[0]); // 这里会是 10, 而不是20
}

a();
```

```js
'use strict';
function a(n = 3) {
  console.log(arguments[0]); // 3
  arguments[0] = 10;

  /* 这里 arguments 的修改并不会同步到 参数 */
  console.log(n); // 3

  n = 20;
  /* 此时 arguments 会记录值, 但是不会跟踪变化 */
  console.log(arguments[0]); // 这里会是 10, 而不是20
}

a();
```
