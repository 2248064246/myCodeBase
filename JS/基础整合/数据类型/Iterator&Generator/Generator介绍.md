
# 生成器

生成器是一种使用强大的新ES6语法定义的迭代器, 特别适合要迭代的值不是某个数据结构的元素, 而是计算结果的场景

调用生成器函数并不会实际执行函数体, 而是返回一个生成器对象. 调用它的next方法, 会导致生成器函数的函数体从头(或当前位置)开始执行, 直到遇见yield语句

yield 语句的值会成为next方法的返回值

> 最大的特点是会通过yield将代码分割为多个部分, 只有调用next() 之后才会调用后续代码 (好强大)

```js
let o =  {
  x: 1,y:2,z:3,
  *g() {
    for(let key of Object.keys(this)) {
      yield key
    }
  }
}
[...o.g()] // => [x, y, z, g]

```

**生成器不能使用箭头函数**

## 生成器示例

```js
/* 一个无穷生成器 */
function* fibonacciSequence() {
  let x=0;y=1;
  for(;;) {
    yield y;
    [x, y] = [y, x+y] // 解构赋值
  }
}

function fibonacci(n) {
  for(let f of fibonacciSequence()) {
    if(n-- <=0 )return f; // 通过这里控制循环结束
  }
}

/* 这个有意思, 生成器嵌套?? */
function* take(n, iterable) {
  let iter = iterable[Symbol.iterator]()
  while(n-- >=0) {
    let next = iter.next()
    if(next.done) return;
    else yield next.value
  }
}

fibonacci(5) // => 8
[...take(5, fibonacciSequence())] // => [1, 1, 2, 3, 5, 8]
```

## yield* 与递归生成器

yield* 与 yield 类似, 但它不是只回送一个值, 而是迭代可迭代对象并回送得到的每一个值

yield* 可以定义递归生成器, 利用这个特性可以通过简单的非递归迭代遍历递归定义的树结构

## 高级生成器特性

生成器的基本特性是可以暂停计算, 回送中间结果, 然后在某个时刻再恢复计算

可以使用生成器在单线程JavaScript代码中创建某种协作线程系统.

也可以利用生成器来掩盖程序中的异步逻辑, 尽管他们实际上是异步的, 但代码看起来还是顺序的, 同步的

### 生成器函数的返回值

通常, 无论是迭代器还是生成器, 如果这个value属性有定义, 那么done属性未定义或为false, 如果done是true, 则value就是未定义的

但是对于返回值的生成器(有 return), 最后一次调用next() 返回的对象的value和done都有定义: value是return回去的值, done是true

最后这个值会被for...of或者扩展操作符忽略, 但是手动调用next()时要注意

```js
function* oneAndDone() {
  yield 1;
  return 'done'
}

let generator = oneAndDone()
generator.next() // {value: 1, done: false}
generator.next() // {value: 'done', done: true}
/* 生成器以完成, 继续调用, 则不会再返回值 */
generator.next() // {value: undefined, done: true}

[...oneAndDone()] // 扩展操作符会忽略 return 返回的值 => [1]
```

### yield 表达式的值

yield 不单可以回送值, 还可以接收next() 传送的值

可以理解为: 生成器通过yield向调用者返回值, 而调用者通过next()给生成器传值

```js
function* smallNumbers() {
  /* 第一个next()传入的值会被抛弃 */
  /* 可以这么理解, 调用 smallNumbers() 代码先执行到 yield 1, 等待next(), 第一次next调用, 立即触发yield回送 */
  /* next() 传入的值进入下一个 yield */
  let y1 = yield 1; // y1: b
  let y2 = yield 2; // y2: c
  let y3 = yield 3; // y3: undefined
  console.log(y1, y2, y3)
}
let g = smallNumbers()
g.next('a') // => {value: 1, done: false}
g.next('b') // => {value: 2, done: false}
g.next('c') // => {value: 3, done: false}
g.next()
```

### 生成器的 return() 和 throw() 方法

throw() 方法用来向生成器抛出异常，并恢复生成器的执行，返回带有 done 及 value 两个属性的对象。

```js
function* test() {
  try {
    yield 1;
  }catch(err) {
    console.log(err)
  }
}
let gen = test()
console.log(gen.next()) // 要执行 throw(), 必须先执行next()
gen.throw(new Error('错误测试'))
```

return() 方法返回给定的值并结束生成器。
```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next();        // { value: 1, done: false }
g.return("foo"); // { value: "foo", done: true } // 会直接结束生成器
g.next();        // { value: undefined, done: true }
```
