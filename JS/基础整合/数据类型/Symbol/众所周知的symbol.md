# 公认符号

Symbol 的作用主要就是为了扩张 JavaScript 语言, 并且保持现有代码的向后兼容性

## Symbol.iterator 和 Symbol.asyncIterator

## Symbol.hasInstance

instanceof 操作符, 在 ES6 以前, 右侧需要是一个构造函数, 会查找右侧兑现的原型链是否存在于左侧的构造函数中

而 Symbol.hasInstance 提供了一个替代选择, 如果 instranceof 操作符右侧是一个有 `[Symbol.hasInstance]`方法的对象, 则左侧的值会被作为参数被调用, 返回值会被替换为布尔值

作为 instanceof 的结构

```js
let uint8 = {
  [Symbol.hasInstance](x) {
    return Number.isInteger(x) && x >= 0 && x <= 255;
  },
};

128 instanceof uint8;
266 instanceof uint8;
```

## Symbol.toStringTag

如果要区分数据类型, 最好的方法是使用 Object.prototype.toString.call()

```js
function classof(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

classof(null); // Null
classof([]); // Array
```

在 ES6 之前,上面这个方法只对内置类型的实例有效. 如果是自己定义的类的实例调用 calssof(), 只会得到 'Object'

而 ES6 中, Object.prototype.toString() 会查找自己参数中是否存在 Symbol.toStringTag. 如果有, 则使用它

```js
class Range {
  get [Symbol.toStringTag]() {
    return 'Range';
  }
}
let r = new Range();
Object.prototype.toString.call(r); // '[object Range]'
classof(r); // 'Range'
```

## Symbol.species

这个有点特殊, 看个例子了解下

```js
class EZArray extends Array {
  get first() {
    return this[0];
  }
  get last() {
    return this[this.length - 1];
  }
}
let e = new EZArray(1, 2, 3);
let f = e.map((x) => x * x);

/* 注意, 此时f也是一个 EZArray 的实例 */
f.first; // 1
```

如果我们修改一下 EZArray

```js
class EZArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
  get first() {
    return this[0];
  }
  get last() {
    return this[this.length - 1];
  }
}
let e = new EZArray(1, 2, 3);
let f = e.map((x) => x * x);
/* 此时 f 是Array的实例, 而不再是 EZArray 的实例 */
f.first; // undefined
```

## Symbol.isConcatSpreadable

这个用在 concat() 方法上, concat() 方法对待数组和非数组参数有不同的处理方式, 对于数组, 会被打平一层, 然后拼接

Symbol.isConcatSpreadable 可以控制是否需要打平, 它也可以出现在类数组中, 是的类数组也可以直接被 concat

```js
let arrayLike = {
  length: 1,
  0: 1,
  [Symbol.isConcatSpreadable]: true
}

let arrayLike_b = {
  length: 1,
  0: 1
}

[].concat(arrayLike) // [1]
[].concat(arrayLike_b) // [{...}]
```

```js
class NonSpreadableArray extends Array {
  get [Symbol.isConcatSpreadable]() {return false;}
}

let a = new NonSpreadableArray(1, 2, 3)

[].concat(a) // [[1,2,3]]
```

## 模式匹配符号

Symbol.search Symbol.match Symbol.replace

可以定义一个对象, 重写这个匹配方法, 然后在字符串调用这些方法的时候, 传入这个对象而不是正则表达式

```js
let pattern = {
  [Symbol.search](s) {
    return s.search(/\d/);
  },
  [Symbol.match](s) {
    return s.match(/\d/);
  },
  [Symbol.replace](s, replacement) {
    return s.replace(/\d/, 'x');
  },
};

'abcd123'.search(pattern);
```

## Symbol.toPrimitive

这个规定对象在遇到类型转换的时候如何转换为原始值

使用 Symbol.toPrimitive 可以覆盖默认的转换机制, 也可以定义自己对象的转换机制, 使得某些对象直接用于比较, 运算等

```js
let obj = {
  a: 'a',
  [Symbol.toPrimitive]() {
    return this.a.charCodeAt(0);
  },
};

obj + 1; // 98
```
