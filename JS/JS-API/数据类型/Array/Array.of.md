## **Array.of()**

通过给定的值生成数组

**语法**

```js
Array.of(...elements);
```

这个方法主要是用来弥补`Array`构造函数的问题的.

通过`new Array()`来生成新数组有时候让人困惑.(因为参数有点复杂)


```js
/* 快速生成一个类数组 */
Array.of.call(function () {}, 1, 2, 3);
// => {0: 1, 1: 2, 2: 3, length: 3}

```
