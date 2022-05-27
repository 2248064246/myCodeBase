# JS 数据类型

## 动态类型

JavaScript 是一种弱类型或者说动态语言。

- 这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。
- 这也意味着你可以使用同一个变量保存不同类型的数据

JS 中语言中类型集合由`原始值`和`对象`组成

- 原始值
  - String
  - Number
  - Boolean
  - Null
  - Undefined
  - BigInt
  - Symbol

> 原始值的定义: `不可变的值`(除对象类型（object）以外的其它任何类型定义的不可变的值)

- 原始值是不可以修改的
- 原始值是按值比较
- 对象(引用类型)可以修改, 对象的比较也不是按值判断
  - 两个引用对象, 当且仅当他们的引用同一个底层对象时(即引用地址), 才相等


## null

null 这个需要单独拿出来说
```js
typeof null === 'object' // true
```

这是JS设计之初就存在的. 原因是null代表空指针(不指向任何内存), 在大多数平台下类型标签值为 0, 对象的类型标签是 0. 所以typeof null 返回 `object`

> MDN 原文: 对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"

[typeof null 的历史](https://2ality.com/2013/10/typeof-null.html) 这篇文章阐述的更加具体
