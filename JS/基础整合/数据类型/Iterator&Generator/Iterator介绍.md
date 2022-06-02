# Iterator 介绍

在使用 `for...of` `展开运算符` `解构` 时会使用到迭代器

全局的迭代器名称由 `Symbol.iterator` 定义

要实现迭代器需要在对象中实现 `Symbol.iterator` 方法

`Symbol.iterator` 方法需要返回一个迭代器对象, 这个对象由以下组成:

```js
[Symbol.iterator]() { // 迭代器方法
    return { // 返回迭代器对象
    /* 需要实现next 方法, 此方法需要返回一个对象, 包含 {value, done}  两个属性*/
    /* 当done为true时, 表示迭代完成 */
    /* done 为 true 时, 可以不用 value 属性 */
    next() {
      return {
        value,
        done: false
      }
    },

    [Symbol.iterator]() { return this} // 迭代器对象里面增加迭代器方法, 返回自身, 使得迭代器对象也可以迭代
    // 当迭代器对象调用自身的迭代器方法的时候, this 就是迭代器对象自身
    }
  }
```

示例

```js
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  [Symbol.iterator]() {
    let next = Math.floor(this.from);
    let last = this.to;
    return {
      next() {
        return next <= last ? { value: next++ } : { done: true }; // 返回迭代结果对象
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
}

let range = new Range(1, 5);
let a = [...range]; // => [1,2,3,4,5]
```

## 迭代器原理

可迭代对象指的是任何具有专用`迭代器方法`, 且该方法返回`迭代器对象`的对象

迭代器对象指的是任何具有`next()`方法, 且该方法返回`迭代结果对象`的对象

迭代结果对象是具有属性`value`和`done`的对象

要迭代一个可迭代对象, 首先要调用迭代器方法获得一个迭代器对象

然后, 重复调用这个迭代器对象的 `next()` 方法, 直至返回 `done` 属性为 true 的迭代结果对象

`迭代器方法`没有惯用名称, 而是使用符号 `Symbol.iterator`作为名字

## for...of 原理

```js
let ary = [1, 2];
let iterator = ary[Symbol.iterator](); // 获取迭代器对象
for (let result = iterator.next(); !result.done; result = iterator.next()) {
  console.log(result.value);
}
```

## 迭代器可迭代

内置可迭代数据类型的迭代器对象本身也是可迭代的(它也有一个 Symbol.iterator, 返回它自身)

```js
let list = [1, 2, 3, 4, 5];
let iter = list[Symbol.iterator]();
let head = iter.next().value; // => 1
let tail = [...iter]; // => [2,3,4,5]
```

## 使用迭代器拓展功能

```js
function map(iterable, fnc) {
  let iteratorFnc = iterable[Symbol.iterator];
  if (typeof iteratorFnc !== 'function') {
    throw new TypeError(`${iterable} is not iterator`);
  }
  /* 这里为什么无法直接 iteratorFnc()??? 可能是应为this的原因, 直接调用this是window */
  let iterator = iteratorFnc.bind(iterable)();
  return {
    next() {
      let n = iterator.next();
      if (n.done) {
        return n;
      } else {
        return {
          value: fnc(n.value),
          done: false,
        };
      }
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

let a = '123';

let b = [...map(a, (v) => v ** v)];
```

```js
function filter(iterable, f) {
  let iterator = iterable[Symbol.iterator]();
  return {
    next() {
      for (;;) {
        let v = iterator.next();
        if (v.done || f(v.value)) {
          return v; // 每执行一次next()必须要有返回值
        }
      }
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}
```

上面的 `map` 和 `filter` 便很好的扩展了原数组的 filter 和 map 方法, 使其不在局限于数组, 而是可以应用于所有可迭代对象

可迭代对象与迭代器有一个重要特点, 即他们天生懒惰: 如果计算下一个值需要一定的计算量, 则相应计算会推迟到实际需要下一个值的时候再发生

这个的一个好处就是可以用来惰性迭代 -- 通俗的话来说就是一点点迭代, 而不是一下处理整个数据

例如对字符串的 split 处理, 如果使用 split() 方法, 在字符串很长的情况下, 那么哪怕一个单词还没用也要处理整个字符串 (这样可能会占用很多内存来保存返回的数组和其中的字符串)

```js
function words(s) {
  let r = /\s+|$/g; // 用来匹配空格或者末尾
  r.lastIndex = s.match(/[^ ]/).index; // 开始匹配第一个非空格
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let start = r.lastIndex;
      if (start < s.length) {
        let match = r.exec(s); // 匹配下一个单词边界
        if (match) {
          return { value: s.substring(start, match.index) };
        }
      }
      return { done: true };
    },
  };
}
```

有一个问题, 为什么不用 `match` 方法呢, ES2020 新增了个 `matchAll` 方法, 此方法返回一个 `迭代器对象`, 可以很简单实现上面方法

```js
function words(s) {
  let iterator = s.matchAll(/\w+/g);
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let v = iterator.next();
      if (v.done) return { done: true };
      else return { value: v.value[0] };
    },
  };
}
```

## 迭代器的 return 方法

如果在 for..of 循环中使用 break, return 或者异常终止循环, 此时迭代器在 done 属性为 true 的迭代结果之前停止,

那么解释器就会检查迭代器对象是否有 return() 方法, 如果有就会调用它

return() 方法必须返回一个`迭代器结果对象`, 这个对象属性会被忽略, 如果不放回对象,会报错

```js
function map(iterable, f) {
  let iterator = iterable[Symbol.iterator]();
  return {
    // 返回一个迭代器对象
    next() {
      let v = iterator.next();
      if (v.done) {
        return v;
      } else {
        return { value: f(v.value) };
      }
    },
    [Symbol.iterator]() {
      return this;
    },
    return() {
      console.log('迭代提前终止', arguments);
      return {
        done: true,
      };
    },
  };
}

/* 只限制在 for...of 迭代中有效, 普通for循环没有效果 */
for (const v of map([1, 2, 3, 4, 5], (x) => x * x)) {
  if (v == 9) break; // 此时会触发 map 中的return方法
  console.log(v);
}
```
