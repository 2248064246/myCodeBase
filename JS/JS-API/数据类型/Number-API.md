
# Number API

[TOC]

## 静态属性

+ `NaN`
  + 返回一个 'NaN' 
+ `MAX_VALUE`
  + 表示 JS 中能表示的最大数值
+ `MIN_VALUE`
  + 表示 JS 中能表示的最小数值
+ `EPSILON`
  + 表示 JS 中的最小进度, 用于比较两个浮点数是否相等
  ```js
  if (Number.EPSILON === undefined) {
      Number.EPSILON = Math.pow(2, -52);
  }
  ``` 
## 静态方法

### ES6~ES8
+ `isNaN`
  + 需要 `Number` 类型, 且为 `NaN` 才会返回 true
+ `isFinite`
  > 判断一个数是否是有限的
  + 同 isNaN 一样, 需要是 Number 类型, 且不是 `NaN` 才会返回 true  
+ `isInteger`
  > 判断一个数是否为整数
  + 同样会先判断是否为 `Number` 类型

> 以上三个同全局的类似方法的共同区别就是, 全局的不会判断类型是否是 `Number`

+ `parseInt(val, base)` 
  > base: 表示val是什么进制的数字. 会统一转为10进制 
+ `parseFloat(val)`
  
> 以上两个同 全局的类似方法是一致的


## 原型方法

### ES5

+ `toFixed`
+ `toString(base)`
  > 可以指定进制, 将值转为指定进制数 
+ `toPrecision(precision)`
  > 将数字转为指定精度, 存在四舍五入情况
  ```javaScript
  let num = 1.2536
  num.toPrecision(4) // => 1.254
  ``` 
  > 小数使用这个有点不同, 在非0数字基础上转为指定精度
  ```javaScript
  let num = 0.0235
  num.toPrecision(2) // => 0.024
  ```

### ES6 ~ ES9

+ `toLocalString([local[, options]])`
  > 将数字转为指定地区的数字
  + 数字按照千分隔
  ```javaScript
   (12312312).toLocaleString() // => "12,312,312"
  ```  
  + 数字前面添加货币符号
  ```javaScript
    (12312312).toLocaleString('zh', { style: 'currency', currency: 'CNY' }); // => "¥12,312,312.00"
  ``` 
  + 转为中文数字
  ```javaScript
    (1234567890).toLocaleString('zh-Hans-CN-u-nu-hanidec') // => "一,二三四,五六七,八九〇"
  ``` 

> 此功能来源于 Intl API, 提供了精确的字符串对比、数字格式化，和日期时间格式化

> Intl API 只有在最新的标准浏览器上才能得到友好的支持