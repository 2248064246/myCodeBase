
# Promise


注意 Promise 的 链式调用, 状态, 错误处理, 如何处理信任问题, 优先级问题


1. promise  的 then 方法中返回的总是 promise
2. 调用 then 方法, 会把then中函数参数推入任务队列(事实上then并不是异步的)
3. promise 将回调嵌套改为一串连续的任务, 下一个任务何时推入任务队列取决于上一个任务的完成时间
4. 信任问题的处理: 通过promise的状态通知下一个任务执行, 由Promise统一管理任务状态, 代码不需经过第三方库执行
5. 优先级问题: 这里查看 `/题目/JS/多个promise链式调用顺序.js`
6. catch 的错误处理原理
7. 重点还有 Promise 的几种状态`决议`, `解决`, `拒绝`, `待定`

## 问什么说 Promise 中错误很容易被忽略

```js
new Promise((resolve, reject) => {
  resolve()
}).then(() => {
  // 如果这里发生了错误, 后面没有catch捕获, 那个这个错误会被忽略
})

```
Promise 中的错误处理总是依赖catch, 而Promise链中某一处发生了问题, 总是会沿着链一直传播, 直到被捕获

