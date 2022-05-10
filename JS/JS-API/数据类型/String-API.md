<!--
 * @Author: your name
 * @Date: 2021-05-30 17:16:50
 * @LastEditTime: 2022-02-24 16:10:49
 * @LastEditors: huangyingli
 * @Description: In User Settings Edit
 * @FilePath: \my-code-base\JS\JS-API\数据类型\String-API.md
-->

# String 类型API

JS 使用的 Unicode 使用的是 UTF-16 编码的

最常用的 Unicode 字符的码点是16位的, 如果超出16位, 则编码为两个16位序列

**意味着, 存在一个长度为2的字符串, 但是只显示一个字符**

## String 静态方法

+ `fromCharCode` 返回由指定的 UTF-16 代码单元序列创建的字符串 | `IE 9`
  ```js
    /* 可以输入十进制数值, 也可以是16进制 */
    String.fromCharCode(65, 66, 67);   // 返回 "ABC" 
    String.fromCharCode(0x2014);       // 返回 "—"
  ```
  **关于补充字符**

  在 UTF-16 中，绝大部分常用的字符可以用一个 16 位的值表示（即一个代码单元）。然而，有一类字符叫 Base Multilingual Plane (BMP)，是所有可寻址的 Unicode 码点的 1/17th。剩下的码点，从范围 65536 (0x010000) 到 1114111 (0x10FFFF) 被称之为补充字符。在 UTF-16 中，补充字符也叫代理（surrogates），用两个 16 位代码单元表示，它是有目的被保留下来的。两个代理（surrogates）形成一个有效组合，也叫代理对，可以用来表示一个补充字符。

  类似于表情图标, 基本上都是2个UTF-16单元
  ```js
  // 返回码点 U+1F303 "
  String.fromCharCode(0xD83C, 0xDF03) // => '🌃'

  // 可以通过 fromCodePoint() 更加方便获取这个码点对应的字符
  String.fromCodePoint(0x1F303) // => '🌃'
  ```
+ `fromCodePoint` 返回使用指定的代码点序列创建的字符串 | `不支持IE`
  ```js

  ``` 
+ `raw` 是用来获取一个模板字符串的原始字符串的(即会执行模板字符串, 然后返回正常的字符串, 注意: 不会进行任何转义)
  ```js
  String.raw`Hi\n${2+3}!`;
  // 'Hi\n5!'，Hi 后面的字符不是换行符，\ 和 n 是两个不同的字符

  String.raw `Hi\u000A!`;
  // "Hi\u000A!"，同上，这里得到的会是 \、u、0、0、0、A 6个字符，
  // 任何类型的转义形式都会失效，保留原样输出，不信你试试.length

  let name = "Bob";
  String.raw `Hi\n${name}!`;
  // "Hi\nBob!"，内插表达式还可以正常运行

  String.raw({raw: ['Hi\n', '']}, name) // 上面的等同于这个这个调用

  // 正常情况下，你也许不需要将 String.raw() 当作函数调用。
  // 但是为了模拟 `t${0}e${1}s${2}t` 你可以这样做:
  String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
  // 注意这个测试, 传入一个 string, 和一个类似数组的对象
  // 下面这个函数和 `foo${2 + 3}bar${'Java' + 'Script'}baz` 是相等的.
  String.raw({
    raw: ['foo', 'bar', 'baz']
  }, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'
  ```

## String 静态属性

## String 原型方法

+ `indexOf(str)`
  + 返回第一个匹配字符的index, 没有返回 -1
+ `lastIndexOf()`
  + 返回最后一个匹配的index, 没有返回 -1
+ `trim()`
  + 去除前后两端的空格
+ `trimEnd()`
  + 去除末尾的空格
+ `trimStart()`
  + 去除前面的空格
+ `padStart(len, str)`
  + 向字符前面填充指定字符, 达到指定长度
+ `padEnd(len, str)`
+ `slice(beginIndex[, endIndex])`
  + 和数组的这个方法一样, 允许负数, 但是一定要有相交集合
+ `substr(start, len)`
  + 获取指定长度字符串
+ `substring(beginIndex, endIndex)`
  + 和 `slice` 一样, 但是之能是正数
+ `includes(str[, position])`
  + 判断这个字符是否存在于整个字符串中
  + 返回 Boolean
+ `replace`
  1. replace(str, newStr)
     + 将找到第一个 str 使用 newStr 替换
  2. replace(regexp, fun() => String)   
+ `match(regexp)`
  + 返回一个数组(匹配的字符串)
+ `split(分隔符)`
  + 通过对应分隔符裁剪字符串, 返回数组
+ `replaceAll`
+ `charAt(index)` 从一个字符串中返回指定的字符
  + 由于存在 (BMP 基本多文种平面), 通过这个方法传入字符下表获取的字符可能不准确
+ `charCodeAt(index)` 返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元 (就是返回字符码点)
  > 注意：，charCodeAt 总是返回一个小于 65,536 的值。这是因为高位编码单元（higher code point）使用一对（低位编码 lower valued）代理伪字符（"surrogate" pseudo-characters）来表示，从而构成一个真正的字符。因此，为了检查（或重现）65536 及以上编码字符的完整字符，需要在获取 charCodeAt(i) 的值的同时获取 charCodeAt(i+1) 的值（如同用两个字母操纵一个字符串），或者改为获取 codePointAt(i) 的值。参看下面例 2 和例 3。 
    ```js
      let c = '❤️😂' 
      c.charCodeAt(0) // => 10084
      c.charCodeAt(1) // => 65039
      String.fromCharCode(10084,65039) // => ❤️
    ```
+ `codePointAt(index)` 返回 一个 Unicode 编码点值的非负整数(和 charCodeAt 非常相似)
+ `toUpperCase`
+ `toLowerCase`
+ `startsWith(str[, position])`
  + 判断字符串是否以某个字符开头, 返回 Boolean
+ `endsWith(str[, position])`
+ `repeat(num)`
  + num 重复次数
  + 返回 重复后的字符串
+ `search(regexp)`
  + regexp 正则对象
  + 返回 匹配字符的 index 位置
+ `localeCompare(otherStr)`
  + 可以比较本地字符(例如 可以比较中文, 按照拼音比较)
+ `at(index)`
  + 获取对应位置字符, 可以为负数
  + 更加方便了获取字符的操作
## String 原型属性

+ length 