## **Array.isArray()**

判断给定的值是否是一个数组(仅限 Array, TypeArray 返回 false)

**语法**

```ts
Array.isArray(value:any):boolean
```

```js
Array.isArray([]); // true
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); // true
```
