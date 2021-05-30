<!--
 * @Author: your name
 * @Date: 2021-05-30 17:16:50
 * @LastEditTime: 2021-05-30 19:17:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-code-base\JS\JS-API\数据类型\String-API.md
-->

# String 类型API

## String 静态方法

+ `fromCharCode` 通过字符串 `utf-16 code` 还原字符串 | `IE 9`
+ `fromCodePoint` 通过一串 Unicode 编码位置返回对应字符串 | `不支持IE`

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
+ `charAt`
+ 
+ `charCodeAt`
+ `fromCharCode`
+ `toUpperCase`
+ `toLowerCase`
+ `startWidth(str[, position])`
  + 判断字符串是否以某个字符开头, 返回 Boolean
+ `endWidth(str[, position])`
+ `repeat(num)`
  + num 重复次数
  + 返回 重复后的字符串
+ `search(regexp)`
  + regexp 正则对象
  + 返回 匹配字符的 index 位置


## String 原型属性

+ length 