## **Array.prototype.concat()**

合并数组(不会去重), 返回一个新数组, **不会更改原有数组**.

如果没有传入值, 则会返回当前数组的一个浅拷贝.

**语法**

**`Array.prototype.concat(value[, value1...valueN])`**

`value`可以是数组,也可以是普通值


**使用 `Symbol.isConcatSpreadable` 合并类数组**

concat 会在类数组的 `Symbol.isConcatSpreadable` 为`true`时将其视为数组来处理

```js
const obj1 = {0:0, 1: 1, 2:2, length: 3};
const obj2 = {0:0, 1: 1, 2:2, length: 3, [Symbol.isConcatSpreadable]: true};

console.log([].concat(obj1, obj2)) // => [{0:0, 1: 1, 2:2, length: 3}, 0,1,2]

```
