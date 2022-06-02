# promise 的错误处理

## catch 捕获

catch 能够捕获 promise reject 的状态, 或者是 promise 抛出的错误;

可以统一在 promise 最后添加错误捕获, 也可以在 promise 链中的某一环添加错误处理方法

## unhandledrejection 事件

如果 promise 中没有 错误处理方法, 则会触发 `unhandledrejection` 事件, 此事件可以被全局`window`监听

```js
window.addEventListener('unhandledrejection', (event) => {
  console.log(event)
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);

  // 防止默认处理（例如将错误输出到控制台, NodeJS 中）

  event.preventDefault();
});

let p = new Promise((resolve, reject) => {
  reject('未知错误');
});
```
