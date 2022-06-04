# AsyncFunction 介绍

异步函数最重要的功能是 `在函数体内, 异步函数会以一种同步的方式被呈现`

async 函数是 AsyncFunction 构造函数的实例， 并且其中允许使用 await 关键字。async 和 await 关键字让我们可以用一种更简洁的方式写出基于 Promise 的异步行为，而无需刻意地链式调用 promise。

注意，AsyncFunction 并不是一个全局对象，需要通过下面的方法来获取：

```js
Object.getPrototypeOf(async function () {}).constructor;
```

```js
new AsyncFunction([arg1[, arg2[, ...argN]],] functionBody)
```

## 规范

async 关键字

1. 返回值是一个 Promise, 无论函数内是否有 await 操作
2. 函数内部 return 返回的值, 会成为 then 回调函数的参数
3. 函数内部如果抛出错误, 会被 then 的第二个参数或 catch 捕获到

await 关键字

1. 只在 async 函数中出现.普通函数内部会报错
2. 正常下, wait 后面是一个 Promise 对象
3. 如果 await 后面不是 Promise , 就直接返回对应的值 (会将其转为 Promise.resolve())
4. await 获取的是 resolve 或者 reject 的结果
5. 如果是 reject, 则直接抛出一个错误, 需要 catch 捕获

### async 实现原理

async 函数本质上是基于期约的

例如有这个一个 async 函数

```js
async function f(x) {
  /* 函数体 */
}
```

可以把它理解为这种样子

```js
function f(x) {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        (function (x) {
          /* 函数体 */
        })(x)
      );
    } catch (e) {
      reject(e);
    }
  });
}
```

但是这种形式要解释 await 比较困难.

可以把 await 关键字想象成分隔代码体的记号, 它们把函数体分割成相对独立的同步代码块. ES2017 解释器可以把函数体分隔成一系列的独立子函数, 每个子函数都将传给它前面的以 await 标记的那个期约的 then()方法
