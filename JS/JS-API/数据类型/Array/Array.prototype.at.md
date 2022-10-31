## **Array.prototype.at()**

获取指定索引位置的元素

**语法**

```ts
Array.prototype.at(idx);
```

`idx` 允许负值. 当`idx`小于 0 时, 将访问索引`index + array.length`.

`idx` 小于 0, 且绝对值大于`array.length`时, 不会从索引`0`开始.

`at()` 方法是通用的, 可以用于`类数组`. (其仅期望 this 具有 length 属性和以整数为键的属性。)

```js
let a = {0: 0, 1: 1, 3: 3, length: 3}

// 需要注意 idx 和 length 相关, 超出 length 不会获取
Array.prototype.at.call(a, 2) // => undefined
Array.prototype.at.call(a, 3) // => undefined

// 如果增加 length
a.length = 4;
// 现在能够获取到对应数据
Array.prototype.at.call(a, 3) // => 3

```
