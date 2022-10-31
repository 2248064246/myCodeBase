## **Array.from()**

从一个可迭代对象或类数组中创建新数组

**语法**

**`Array.from(arrayLike|iterator [, mapFn])`**

可以增加一个`map`函数, 来对生成的数组做一次处理. 等同于 `Array.from().map()`

```js
Array.from('1234', (x) => x * x);
// => [1, 4, 9, 16]
```

Array.from 一个好玩的应用--序列生成器

```js
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (v, k) => start + k * step);

range(0, 10, 2); // => [0,2,4,6,8,10]

// amazing 
range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map((s) =>
  String.fromCharCode(s)
);

```

可以通过 `call, apply` 等方法来改变 Array.from 的内部构造器, 改变其返回值类型



```js
function NotArray(length) {}

Array.from.call(NotArray, new Set(['foo', 'bar']));
// => NotArray {0: 'foo', 1: 'bar', length: 2}

```
