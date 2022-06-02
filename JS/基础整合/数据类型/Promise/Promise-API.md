# Promise API

## 构造函数

```js
new Promise((resolve, reject) => {
  // 返回 fulfilled
  resolve();

  // 返回 rejected
  reject();
}).then((res) => {});
```

> 重要: Promise 构造函数中的回调函数是同步执行的, 在 `resolve` 或 `reject` 执行之后, 将后面的 then() 推入微任务队列,

## 静态方法

- `all(iterable<promise>)`
  返回一个新的 promise, **等待 iterable 对象中所有的 promise 都成功或有任意一个失败**.

  如果所有的 promise 都成功, 它会返回一个数组作为成功回调值, 顺序和 iterable 保持一致.

  一旦有任意一个 promise 失败, 则立即以该 promise 的失败理由来 reject 这个新的 promise.

- `allSettled(iterable<promise>)`
  等待所有的 promise 都敲定(每个 promise 都兑现或拒绝).

  返回一个数组作为成功回调值, 该数组顺序和 iterable 保持一致.

- `any(iterable<promise>)`
  接收一个 promise 对象的集合，当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。

- `race(iterable<promise>)`
  返回一个新的 promise, 当其中任意一个 promise 敲定后, 就返回那个 promise 的值

- `reject(reason)`
  返回一个状态为已拒绝的 Promise 对象，并将给定的失败信息传递给对应的处理函数。

- `resolve(value)`
  返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable（即，带有 then 方法的对象），返回的 Promise 对象的最终状态由 then 方法执行结果决定；否则，返回的 Promise 对象状态为已兑现，并且将该 value 传递给对应的 then 方法。

  resolve thenable 并抛出错误

  ```js
  // Resolve 一个 thenable 对象
  var p1 = Promise.resolve({
    then: function (onFulfill, onReject) {
      onFulfill('fulfilled!');
    },
  });
  console.log(p1 instanceof Promise); // true，这是一个 Promise 对象

  p1.then(
    function (v) {
      console.log(v); // 输出"fulfilled!"
    },
    function (e) {
      // 不会被调用
    }
  );

  // Thenable 在 callback 之前抛出异常
  // Promise rejects
  var thenable = {
    then: function (resolve) {
      throw new TypeError('Throwing');
      resolve('Resolving');
    },
  };

  var p2 = Promise.resolve(thenable);
  p2.then(
    function (v) {
      // 不会被调用
    },
    function (e) {
      console.log(e); // TypeError: Throwing
    }
  );

  // Thenable 在 callback 之后抛出异常
  // Promise resolves
  var thenable = {
    then: function (resolve) {
      resolve('Resolving');
      throw new TypeError('Throwing');
    },
  };

  /* 上述同样使用于 Promise 构造函数 */

  var p3 = Promise.resolve(thenable);
  p3.then(
    function (v) {
      console.log(v); // 输出"Resolving"
    },
    function (e) {
      // 不会被调用
    }
  );
  ```

## 实例方法

- `catch()`
- `then()`
- `finally()`
  finally() 方法返回一个 Promise。在 promise 结束时，无论结果是 fulfilled 或者是 rejected，都会执行指定的回调函数。这为在 Promise 是否成功完成后都需要执行的代码提供了一种方式。
  这避免了同样的语句需要在 then() 和 catch() 中各写一次的情况。
