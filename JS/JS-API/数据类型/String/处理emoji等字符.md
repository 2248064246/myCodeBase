# 处理 emoji 等字符

## 正确得到长度

1. 可以使用 `for...of` 循环. (对于字符串, 应该是字符串的迭代器做了一些处理.)
   > 虽然它能够通过码点循环, 但是目前还是存在一些 emoji 无法正确处理
2. Array.from() 这个也一样

> 以上两个方法可以获取普通 四字节字符, 但是对于特殊的字符簇无法处理

```js
let str = '123🐭';
Array.from(str); // ['1', '2', '3', '🐭']

let str2 = '❤️1😂';
/* 出现问题了 */
Array.from(str2); // ['❤', '️', '1', '😂']
```

1. 通过码点判断是代理对还是正常码点, 然后使用正则做出处理

  [stringz 库](https://www.npmjs.com/package/stringz)

  > 实际上这个库对于字符的区别使用的是 [char-regex](https://github.com/Richienb/char-regex/blob/main/index.js) 这个库

4. 通过 lodash 库的 `toArray` 方法来将字符转为数组.(能够完美区分特殊 emoji)

lodash 在 `toArray` 中对字符串做了和 `char-regex` 几乎相似的正则判断
