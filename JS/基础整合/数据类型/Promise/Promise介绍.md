# Promise 介绍

Promise 让你能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者。

一个 Promise 必然处于以下几种状态:

- 待定(pending): 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现(fulfilled): 意味着操作成功完成。
- 已拒绝(rejected): 意味着操作失败。

待定状态的 Promise 对象要么会通过一个值被兑现，要么会通过一个原因（错误）被拒绝。当这些情况之一发生时，我们用 promise 的 then 方法排列起来的相关处理程序就会被调用。如果 promise 在一个相应的处理程序被绑定时就已经被兑现或被拒绝了，那么这个处理程序也同样会被调用，因此在完成异步操作和绑定处理方法之间不存在竞态条件。

```js
let p = new Promise((resolve, reject) => {
  resolve('123');
});

/* 两个都会触发 */
setTimeout(() => {
  let x = p.then((res) => console.log('x', res));
}); // x 123
let y = p.then((res) => console.log('y', res)); // y 123
```

因为 Promise.prototype.then 和 Promise.prototype.catch 方法返回的是 promise，所以它们可以被链式调用。

> 备注： 如果一个 promise 已经被兑现或被拒绝，那么我们也可以说它处于 已敲定（settled） 状态。你还会听到一个经常跟 promise 一起使用的术语：已决议（resolved），它表示 promise 已经处于已敲定状态

## then and catch

.then() 方法需要两个参数，第一个参数作为处理已兑现状态的回调函数，而第二个参数则作为处理已拒绝状态的回调函数。

**当 .then() 中缺少能够返回 promise 对象的函数时，链式调用就直接继续进行下一环操作。因此，链式调用可以在最后一个 .catch() 之前把所有的处理已拒绝状态的回调函数都省略掉。**

过早地处理变为已拒绝状态的 promise 会对之后 promise 的链式调用造成影响。不过有时候我们因为需要马上处理一个错误也只能这样做。例如，外面必须抛出某种类型的错误以在链式调用中传递错误状态。另一方面，在没有迫切需要的情况下，可以在最后一个 .catch() 语句时再进行错误处理，这种做法更加简单。**.catch() 其实只是没有给处理已兑现状态的回调函数预留参数位置的 .then() 而已。**


then 中的回调如果没有返回值, 或者返回一个普通对象, 原始类型数据, 则会被包装为 `Promise.resolve`

但是如果 then 中的回调返回一个 `promise` 时, 就会出现一种动态的替换效果, return 会导致一个 `promise` 被弹出, 但是这个 回调中返回的 `promise` 会被推入 **被弹出promise原来的位置** 

```
假设有如下 promise 嵌套关系, 最外层是 promiseA
(promise D, (promise C, (promise B, (promise A) ) ) )

现在 promiseB 中返回一个 promiseX, 则结果为

(promise D, (promise C, (promise X) ) )
```

> 对于上面的表述, 有一个经典的题目

```js
Promise.resolve().then(() => {
  console.log(0);
  // 这里, 先等待resolve(), 尽管后面没有then
  // 然后 替换原来的 promise
  // 最后才是外层的 then
  return Promise.resolve(4);
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
  
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
```

