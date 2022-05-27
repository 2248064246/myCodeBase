# Number API

[TOC]

## 静态属性

- `NaN`
  - 返回一个 'NaN'
- `MAX_VALUE`
  - 表示 JS 中能表示的最大数值
- `MIN_VALUE`
  - 表示 JS 中能表示的最小数值
- `EPSILON`
  - 属性表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值
  ```js
  if (Number.EPSILON === undefined) {
    Number.EPSILON = Math.pow(2, -52);
  }
  ```
- `MAX_SAFE_INTEGER`| ES6+
  - 表示 JS 中的最大有效整数 (2^53 -1)
  - 最小整数是 -(2^53 -1)
  - 安全的意思是能够准确区分两者的值, 超过安全范围的值, js 将无法正确区分
  - 例如 Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 将得到 true 的结果，而这在数学上是错误的

## 静态方法

### ES6~ES8

- `isNaN`
  - 需要 `Number` 类型, 且为 `NaN` 才会返回 true
- `isFinite`
  > 判断一个数是否是有限的
  - 同 isNaN 一样, 需要是 Number 类型, 且不是 `NaN` 才会返回 true
- `isInteger`
  > 判断一个数是否为整数
  - 同样会先判断是否为 `Number` 类型

> 以上三个同全局的类似方法的共同区别就是, 全局的不会判断类型是否是 `Number` (会进行类型转换)

- `parseInt(val, base)`
  > base: 表示 val 是什么进制的数字. 会统一转为 10 进制
- `parseFloat(val)`

> 以上两个同 全局的类似方法是一致的

- `isSafeInteger(val)`
  > 判断一个数是否是有效整数
  > 会判断这个值是否是`Number`类型(不会进行类型转换)

## 原型方法

### ES5

- `toFixed(digits)`
  > 返回指定小数位的数值`字符串形式`
  > 会有四拾伍入, 小数位不够会填充 0
  > 不会使用指数计数法
  > digits 参数范围在 `0~20` 之间, 默认 0
  > [关于慎用 toFixed](https://github.com/ljianshu/Blog/issues/95)
  ```js
  (2.3).toFixed(2); // '2.30'
  (1.2e3).toFixed(3) - // '1200.000'
    // 这里注意, 是先toFixed, 然后在 -'2.30' 转为数值
    (2.3).toFixed(2); // -2.3
  ```
- `toString(base)`
  > base值 `2~36` 之间 
  > 可以指定进制, 将值转为指定进制数
  > 如果对象是负数，则会保留负号。即使radix是2时也是如此：返回的字符串包含一个负号（-）前缀和正数的二进制表示，不是 数值的二进制补码。
- `toPrecision(precision)`

  > **精度指的是数字的位数**
  > 将数字转为指定精度, 存在四舍五入情况
  > 注意返回的是`字符串`

  ```javaScript
  let num = 1.2536
  num.toPrecision(4) // => 1.254
  ```

  > 小数使用这个有点不同, 在非 0 数字基础上转为指定精度

  ```javaScript
  let num = 0.0235
  num.toPrecision(2) // => 0.024
  ```

  > precision 属性值在 1~100 之间, 超出会抛出错误
  > 某些时候会返回科学计数法形式的值

  ```js
  (12345).toPrecision(2); // `1.2e+4`
  ```

### ES6 ~ ES9

- `toLocalString([local[, options]])`
  > 将数字转为指定地区的数字
  - 数字按照千分隔
  ```javaScript
   (12312312).toLocaleString() // => "12,312,312"
  ```
  - 数字前面添加货币符号
  ```javaScript
    (12312312).toLocaleString('zh', { style: 'currency', currency: 'CNY' }); // => "¥12,312,312.00"
  ```
  - 转为中文数字
  ```javaScript
    (1234567890).toLocaleString('zh-Hans-CN-u-nu-hanidec') // => "一,二三四,五六七,八九〇"
  ```

> 此功能来源于 Intl API, 提供了精确的字符串对比、数字格式化，和日期时间格式化

> Intl API 只有在最新的标准浏览器上才能得到友好的支持
