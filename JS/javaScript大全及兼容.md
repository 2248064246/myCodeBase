# JS 兼容问题

[TOC]

## `Array` 类型

+ 数组方法
  + `of`,  `chrome` 45+, `IE`不支持
  + `from`, 同上
  + `isArray`, `chrome` 5+, `IE`9+
+ 数组原型方法
  + `chrome` 1+, `IE`9+
    + `map`
    + `pop`
    + `push`
    + `some`
    + `sort`
    + `every`
    + `shift`
    + `slice`
    + `concat`
    + `filter`
    + `reduce`
    + `splice`
    + `forEach`
    + `indexOf`
    + `reverse`
    + `unshift`
    + `lastIndexOs`
    + `reduceRight`
  + `chrome 45+, `IE`不支持
    + `fill`
    + `find`
    + `join`
    + `keys`
    + `entries`
    + `includes`
    + `copyWhin`
    + `findIndex`
  + `chrome 66+`, `IE 不支持`
    + `values`
  + `chrome 69+`, `IE 不支持`
    + `flat`
    + `flatMap`

## `...obj`
> `chrome46+`

## `for...in` & `for...of`
> `for...in` 支持 `chrome 1+` `IE9+`

> `for...of` 支持 `chrome38+`, `IE 不支持`

## `promise`

> `promise` 的 `then` `catch` `all` `race` `reject` `resolve` 支持 `chrome32+`

> `finally` 支持 `chrome 63+`

## `Object` 类型

+ `Object`方法
  + `values` | `chrome 54+`
  + `assign` | `chrome 45+`
  + `keys` | `chrome 6+` `IE10+`
  + `create` | `chrome 5+` `IE9+`
  + `freeze` | `chrome 6+`
  + `isFrozen` | `chrome 6+`
  + `seal` | `同上`
  + `isSealed` | `同上`
  + `preventExtensions` | `chrome 44+ 最兼容`
  + `isExtensible` | `chrome 6+`
+ `Object` 原型方法不存在兼容问题
  + `isPrototypeOf`
  + `hasOwnProperty`

## `String`

+ `String` 方法
  + `raw` | `chrome 41+`
  + `fromCharCode` | `chrome 1+`
  + `fromCodePoint` | `chrome 41+`
+ `String` 原型方法
  + `trim` | `chrome 4+` `IE+`
  + `trimEnd` | `chrome 66+`
  + `trimStart` | `chrome 66+`
  + `match` | `chrome 1+`
  + `slice`
  + `split`
  + `charAt`
  + `charCodeAt`
  + `toLowerCase`
  + `toUpperCase`
  + `toLocalCompare`
  + `toLocalLowerCase`
  + `toLocalUpperCase`
  + `concat` | 都支持 `chrome 1+`
  + `padEnd` | `chrome 57+`
  + `padStart` | `chrome 57+`
  + `repeat` | `chrome 41+`
  + `search` | `chrome 1+`
  + `substr` | `chrome 1+` 
  + `substring` | `chrome 1+`
  + `indexOf` | `chrome 1+`
  + `lastIndexOf` | `chrome 1+`
  + `replace` | `chrome 1+`
  + `endsWith` | `chrome 41+`
  + `startsWith` | `chrome 41+`
  + `codePointAt` | `chrome 41+`
  + `includes` | `chrome 41+`
  + <code style="color: tomato" >matchAll | chrome 73+</code>
  + `normalize` | `chrome 34+`
  + <code style="color: tomato" >replaceAll | chrome 85+</code>


## `Number` 类型

  + Number 属性
    + `NaN` | `chrome 1+`
      + Number.NaN 等同于 NaN
  + Number 方法
    + `isNaN` | `chrome 25+` `IE 不支持` 
      + Number.isNaN() 和 global的isNaN() 区别
        + `isNaN()` 只要是非数字和非数字字符都会是 `true`
        + `Number.isNaN()` 需要是 `Number` 类型并且为 `NaN` 才会是 `true`  
    + `isFinite` | `chrome 19+` `IE 不支持`
      + 判断一个数值是否有限 **`字符串无法判断`**
      ```javaScript
        Number.isFinite(Infinity);  // false
        Number.isFinite(NaN);       // false
        Number.isFinite(-Infinity); // false

        Number.isFinite(0);         // true
        Number.isFinite(2e64);      // true

        Number.isFinite('0');       // false, would've been true with
                                    // global isFinite('0')
        Number.isFinite(null);      // false, would've been true with
                                    // global isFinite(null)
      ```
    +  `isInteger` | `chrome 34+` `IE 不支持`
       +  用于判断一个数是否是整数, 如果值的NaN或者 Infinity, 则返回false
       +  字符串, Boolean, Object 都会返回 `false`
    + `isSafeInteger` | `chrome 34+`
      + 判断一个值是否是`js`中的安全数字, `js`中浮点数是有范围的, 超过一定范围精度会出现问题
    + `parseFloat` | `chrome 34+`
      + 同 `global 的 parseFloat()`
    + `parseInt` | `chrome 34+`
      + 同 `global` 的 `parseInt()`
  + Number 原型方法
    + `toFixed` | `chrome 1`
      + 保留小数点后指定的位数, 会四舍五入, 指定位数超出现有位数会补零
    + `toPrecision` | `chrome 1`
      + 保留指定位数, 会四舍五入, 不会舍弃小数
    + `toExponential` | `chrome 1`
      + 转为科学计数法方式展示
    + `toLocalString(local)` | `chrome 24+`
      + 转位本地文字, 并且会根据每个地区的不同使用不同的分隔方式
        ```javaScript
          (12312312).toLocaleString() // => "12,312,312"
          (12312312).toLocaleString('zh', { style: 'currency', currency: 'CNY' }); // ￥12,312,312.00，人民币形式
          (1).toLocaleString('zh', {style:'percent'}) // => 100%
        ``` 

## 







