# 数组方法大全

[toc]

## 数组静态方法

### ES6 以上

- `of(element[, ...]) => Array`

  > 从可变数量参数创建数组

- `from(arrayLike|iterator [,mapFnc]) => Array`

  > 从类数组或可迭代对象中创建数组

- `isArray(any) => Boolean`
  > 用来判断某个变量是否是一个数组对象

## 实例属性

- length

  > length 属性的值是一个 0 到 2^32 - 1 的整数。

  > JS 数组有最大长度限制, 也就是 2^32

  可以设置 length 属性的值来截断任何数组。当通过改变 length 属性值来扩展数组时，实际元素的数目将会增加。

## 数组原型方法

### ES5

- `push(element[,...]) => length`

  > 向数组尾部增加数据, 返回数组`length`

  > **更改原来数组**

  ```javaScript
   let array = [1, 2, 3]
   array.push(4, 5) // => 5
   // 返回数组长度
   // array => [1, 2, 3, 4, 5]
  ```

- `pop() => element`

  > 删除并返回数组最后一个元素

  > **更改原来数组**

  ```javaScript
    let array = [1, 2, 3]
    array.pop() // => 3
    // 返回别删除的数据
    // array => [1, 2]
  ```

- `shift() => element`

  > 删除并返回数组第一个元素

  > **更改原来数组**

  ```javaScript
    let array = [1, 2, 3]
    array.shift() // => 1
    // 返回删除的数据
    // array => [2, 3]
  ```

- `unshift(element[,...]) => length`

  > 向数组头部增加元素, 返回数组`length`

  > **更改原来数组**

  ```javaScript
    let array = [1, 2, 3]
    array.unshift(-1, 0) // => 5
    // 返回数组长度
    // array => [-1, 0, 1, 2, 3]
  ```

- `slice(n, m) => Array`

  > 获取指定位置区间的数据元素, 范围: [n, m), 原数组不会改变

  > 返回获取的元素数组, 没有返回空数组

  ```javaScript
    let array = [1, 2, 3]
    let sliceAry = array.slice(0, 2) // [0 - 2) 从索引0到2(不包括2)之间的元素(数组)
    // sliceAry => [1, 2] 返回获取的数组
    // array => [1, 2, 3] 原来数组保持不变

    // slice(n, m)
    // m不写默认为数组长度
    // n, m 值可以为负值 (负值从后面开始数)
    // n, m 必须要有交集, 不然返回空数组

    // 获取最后一个元素
    array.slice(-1) // => [3]
  ```

- `splice(index, deleteNumber, item...) => Array`

  > 即可以新增也可以删除数据元素

  > index: 操作位置索引(向索引前面操作), deleteNumber: 要删除的个数, item: 用于填充索引位置的数据

  > 返回删除的元素数组, 如果是新增, 返回空数组

  index 规则:

  - 如果超出了数组长度, 则从数组末尾开始
  - 如果时负值
    - 如果负值的绝对值大于数组长度, 则从 0 开始
    - 否则等价于 `array.length - index `

  > **更改原来数组**

  ```javaScript
    let array = [1, 2, 3]
    // 新增
    // array.splice(0, 0, -1, 0) // => 返回 [], 删除0个元素
    // array => [-1, 0, 1, 2, 3]
    // 向 0索引前面删除0个元素, 并使用 -1, 0 填充 0索引前面

    // 删除
    // array.splice(1, 1) // => 返回 [0]
    // array => [-1, 1, 2, 3]

  ```

  ```javaScript
    // 尾部删除
    array.splice(array.length, 1)
    // 尾部增加
    array.splice(array.length,0, items...)
    // 头部删除
    array.splice(0, 1)
    // 头部增加
    array.splice(0, 0, items...)
  ```

- `join(separator) => String`

  > 将数组转为字符串, 接收一个分隔符, 没有默认为','

- `indexOf(str) => Number`

  > 查找字符第一次出现的位置, 没有返回 -1

- `lastIndexOf(str) => Number`

  > 查找字符串最后出现的位置, 没有返回 -1

- `forEach(fnc(value, index, array))`

- `map(fnc(value, index, array) => element) => Array`

  > 循环执行传入的函数, 并通过函数返回值构建一个新数组

- `filter(func(value, index, array) => Boolean) => element`

  > 返回过滤数组, 回调函数中返回 true 则筛选出这个元素

- `some(func(value, index, array) => Boolean) => Boolean`

  > 判断数组中是否有符合要求的元素, 返回 Boolean

- `every(func(value, index, array) => Boolean) => Boolean`

  > 判断数组的元素是否全部符合要求, 返回 Boolean

- `reduce(func(accumulator, currentValue, currentIndex, array), startValue) => any`

  > 回调函数第一次执行时，accumulator 和 currentValue 的取值有两种情况：如果调用 reduce()时提供了 initialValue，accumulator 取值为 initialValue，currentValue 取数组中的第一个值；如果没有提供 initialValue，那么 accumulator 取数组中的第一个值，currentValue 取数组中的第二个值。

  > 汇总数组元素的方法, 返回回调函数中的值 (只会循环 array.length -1 次)

  > startValue 是对 func 累计器的初始化值, 没有的话 startValue 会是数组的第一项

  ```javaScript
    let array = [1,2,3,4,5]
    array.reduce((sum, cur) => sum += cur) // => 15

    let array2 = [[0, 1], [2, 3], [4, 5]]
    array2.reduce((sum, cur) => sum.concat(cur)) // => [0,1,2,3,4,5]
    // 简单的数组 flat 方法

  ```

- `reduceRight`

  > 从末尾开始的 `reduce`

- `sort(func(a, b) => Number) => Array`

  > 排序方法, b -a 是降序, a-b 是升序

  > 回调中 >0 则交换 a, b 顺序, <=0 则不动

  > **更改原来数组**

- `reverse() => Array`

  > 数组逆序

- `concat(array|element) => Array`

  > 数组拼接方法, 返回合并后的数组

  > **不会更改原来数组**

## ES6 ~ ES7

- `fill(value[, start[, end]]) => Array`

  > **更改原来数组**

- `find(func(value, index, array) => Boolean) => element`

  > 查找数组元素方法 , 没有找到返回 undefined

- `findLast(func(value, index, array) => Boolean) => element`

- `findIndex(func(value, index, array) => Boolean) => index`

  > 查找数组元素位置方法, 没有找到返回 -1

- `findLastIndex`

- `includes(value[, fromIndex]) => Boolean`
  > 查找数组中是否包含这个值, 返回 Boolean
- `keys() => Array`

  > 返回一个包含数组索引的迭代器对象

  和 `Object.keys()` 不同的是, `Array.prototype.keys()` 会包含没有数据的 key

  ```js
  var arr = ['a', , 'c'];
  var sparseKeys = Object.keys(arr);
  var denseKeys = [...arr.keys()];
  console.log(sparseKeys); // ['0', '2']
  console.log(denseKeys); // [0, 1, 2]
  ```

- `entries() => Iterator`

  > 返回一个 Array Iterator

  ```javaScript
    const a = ['a', 'b', 'c'];

    // 我觉得最大的作用就是这个了, 在for...of获取index
    for (const [index, element] of a.entries())
      console.log(index, element);
  ```

- `copyWithin(target[, start[, end]])`

  > 这个东西的用法及其奇怪

  > **原数组更改**

  ```javaScript
    let b = [1, 2,3,4,5,6,7]
    b.copyWithin(0, 5) // => [6, 7, 3, 4, 5, 6, 7]
    // 取 index 5级以后的元素, 从第 0位开始覆盖
  ```

## ES8 ~ ES10

- `values() => Array`

  > 返回一个包含数组值的迭代器对象

  和`Object.values()` 不同的是, 它会包含数组中的空值

  ```js
  var arr = ['a', , 'c'];
  var sparseKeys = Object.values(arr);
  var denseKeys = [...arr.values()];
  console.log(sparseKeys); // ['a', 'c']
  console.log(denseKeys); //  ['a', undefined, 'c']
  ```

- `flat([depth]) => Array`

  > 数组展平方法, depth 默认 1

- `flatMap(fun)`
  > 等同 `map().flat()`

## ES2021

- `at(index) => element`
  > 返回指定位置的数据, index 可以为负值
