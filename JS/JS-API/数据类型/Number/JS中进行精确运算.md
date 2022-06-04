
# JS 中的精确运算

JS中主要不精确的地方在小数运算. 

一个思路是将小数化为正数运算, 然后在将结果转为整数


## JS 高精确运算库

`high-precision-four-fundamental-rules`

它的主要功能并不在运算, 而是在小数长度和舍入上


JS 的 `toFixed()` 存在舍入问题
```js
1.335 .toFixed(2) // 1.33
```


`math.js`

> 这是一个专业的数学运算库, 很庞大...

