

# Promise 

## 什么是 Promise

> 提供了统一的API用于处理异步操作, 避免嵌套的对调函数. 可以将异步操作以同步操作的流程表达出来

## Promise 状态

+ pending 进行中
+ fulfilled 已完成
+ rejected 已失败

## Promise 特点

+ 对象转态不受外界影响, 只有异步操作结果可以决定当前状态
+ 一旦状态改变, 就不会再变
+ 良好的错误检测机制

## 基础语法

### new Promise

  ```javaScript
  new Promise((resolve, reject) => {
    // 返回 fulfilled
    resolve()

    // 返回 rejected
    reject()
  }).then(res => {

  })
```
> 重要: 在 `Promise` 类中的代码是同步的, 通过 `resolve` 和 `reject` 来触发 `then` 执行

### 关于 then 和 catch

+ `then` 中接收两个函数, 一个用于处理 `resolve`, 一个用于处理 `reject`
+ `catch` 专门捕获 `Promise` 的各种错误, 包括 `同步的` 和 `异步的`
> 当 `then` 中处理 `reject` 的时候, `catch` 将不会再捕获到错误信息

  ```javaScript

  new Promise((resolve, reject) => {
    throw new Error('手动抛出错误')
  }).then(null, err => {

  }).catch(err => {
    // 由于 then 中处理错误状态, 所以 catch 无法捕获到错误了
  })

  ```

### finally | chrome 63+

> 这个作用是: 不管 Promise 中状态怎么样, 最终都会执行 `finally` 中的回调

### Promise.all()

> 接收一个 `Promise 实例` 数组, 会依次同时调用这些实例, 并一起将结果返回, 结果为一个数组

  ```javaScript

  Promise.all([p1, p2, p3]).then(([p1s, p2s, p3s]) => {
    // p1, p2, p3 为 Promise 实例
    
    // p1s, p2s, p3s 为 对应promise处理的结果
  })

  ```

+ 需要注意的是, 如果 p1, p2, p3 都有自己的 错误处理, 那么 `Promise.all` 的 catch 将无法捕获到错误
+ 如果其中有一个`Promise` 返回了 `reject`, 也会调用 `Promise.all` 后面的方法

### Promise.race()

> 参数与 `Promise.all` 一样, 不同的是 `race` 先返回第一个 `resolve` 的 `Promise`

+ 注意: 如果最开始那个返回 `reject`, `race`也会调用 `then`

### Promise.allSettled() | ES2020特性, chrome 76+

> 参数与 `all`, `race` 相同, 但是返回的结果略有不同

  ```javaScript
  const resolved = Promise.resolve(42);
  const rejected = Promise.reject(-1);
  Promise.allSettled([resolved, rejected]).then((result) => {
    // result 是一个数组

    // [
    //    { status: 'fulfilled', value: 42 },
    //    { status: 'rejected', reason: -1 }
    // ]

  })

  ```
+ 返回 `resolve`, 使用`value`接收值, 返回 `reject`, 使用 `reason` 接收
+ 和 `all` 相比, 只有数组中所有的 `Promise` 实例都处理完了, 才会触发`then`, 无论其中的 `Promise 实例` 是 `resolve`还是`reject` 

### Promise.any() | ES2021 特性 chrome86+

> 参数与 `all`, `race` 相同

+ 返回第一个 `resolve`, 这是和 `race` 不同的地方




  