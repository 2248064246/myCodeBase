# String 介绍

得到一个 String 变量有以下几种方法

```js
/* 字面量 */
let s = '123';

/* 通过函数转换类型 */
let s2 = String('123');

/* 通过构造函数, 此时生成的是一个对象 */
let s3 = new String('123');

/* 注意 */
typeof s; // string
typeof s2; // string
typeof s3; // object
```

## 模板字面量

```js
let a = `123456`; // 123456
```

## 转义字符

> 这个没什么好多说的, 记住常用的几种就 ok

- `\0` 空字符
- `\'` `\"` `\\`
- `\n` 换行
- `\r` 回车

> 转义字符 `\n` `\r` 对于 JS 字符的显示没有太大影响. 主要是在 DOM 的文字显示上有区别

使用`pre` 标签, 能够将 `\n` `\r` 等格式显示出来

使用`title` 属性, 能够在鼠标移入时显示 `\n` `\r` 等格式

## 字符串连接

`+` 可以用于连接两个字符串

`\` 同样可以

> `\` 后面不能有空格或除换行符意外的其他任意字符

```js
let s =
  '123\
123\
123';
```

## 基本字符串和字符串对象的区别

- 基本字符串在使用字符串对象上的方法时, js 会自动将其转为字符串对象
- 在使用 `eval`时, 基本字符串和字符串对象有区别

```js
s1 = '2 + 2'; // creates a string primitive
s2 = new String('2 + 2'); // creates a String object
console.log(eval(s1)); // returns the number 4
console.log(eval(s2)); // returns the string "2 + 2"
```
