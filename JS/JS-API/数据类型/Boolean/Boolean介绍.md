# Boolean 介绍

JS 中 boolean 为 false 的值: `+0` `-0` `NaN` `''|""` `0` `false` `null` `undefined`

这里需要注意 Boolean 对象

```js
var x = new Boolean(false);
if (x) {
  // 这里的代码会被执行
}
```

> 基本上所有原始类型的构造函数都有这种特性, new 出来的是个对象



