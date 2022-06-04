# 转为 String 类型

JS 中, 绝大部分其他类型值转为 String 都是在其值前后加上 `"` 或 `'`

有些类型重写了 toString() 以及 `valueOf` 方法, 所以会有写区别

有一些类型上并没有`toSting` 方法, 例如: `null`, `undefined` `Symbol`

但是这些类型依然可以通过 `String` 方法转为 string 类型

> 有一个值得注意点: `String()` 直接调用的是 `toString` ,而 `x + ''` 是先`valueOf` -> `toString`, 这是一个`重要的差别`

基于上面这个, 有一个非常有意思的

```js
let a = {};

a.valueOf = function () {
  return 1;
};

1 + a; // 2
```
