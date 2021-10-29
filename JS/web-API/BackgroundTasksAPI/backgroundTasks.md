
# Background Tasks API | `chrome 47+`

幕后任务协作调度API,  提供了由用户代理决定，在空闲时间自动执行队列任务的能力。


## 概念和用法

将一些次要的任务的移交到主要事件循环空闲之后运行, 防止主要事件循环运行过程影响页面阻塞

在过去，除了编写尽可能高效的代码和将尽可能多的工作移交给 workers 之外，没有其他可靠的方法可以做到这一点.

而现在 ` Window.requestIdleCallback()` 允许浏览器告诉您的代码可以安全使用多少时间而不会导致系统延迟，从而有助于确保浏览器的事件循环平稳运行

它返回一个id, 可以通过`window.cancelIdleCallback()` 取消这个回调


### 充分利用空闲回调

因为 idle callbacks 旨在为代码提供一种与事件循环协作的方式，以确保系统充分利用其潜能，不会过度分配任务，从而导致延迟或其他性能问题，因此您应该考虑如何使用它。

+ 对非高优先级的任务使用空闲回调
+ 空闲回调应尽可能不超支分配到的时间
+ 避免在空闲回调中改变 DOM (应该使用 requestAnimationFrame)
+ 避免运行时间无法预测的任务

### 回退到Timeout

后台任务API是很新的标准, 某些浏览器可能不支持

```js
window.requestIdleCallback = window.requestIdleCallback || function(handler) {
  let startTime = Date.now();

  return setTimeout(function() {
    handler({
      didTimeout: false,
      timeRemaining: function() {
        return Math.max(0, 50.0 - (Date.now() - startTime));
      }
    });
  }, 1);
}
```

```js
window.cancelIdleCallback = window.cancelIdleCallback || function(id) {
  clearTimeout(id);
}
```


## 相关对象和方法

+ `requestIdleCallback(callback[, options])`
  + 返回一个id
  + callback: 一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 IdleDeadline 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
  + options: 包括可选的配置参数。具有如下属性：
    + timeout:  如果指定了timeout，并且有一个正值，而回调在timeout毫秒过后还没有被调用，那么回调任务将放入事件循环中排队(强行在多少秒后执行)

+ `cancelIdleCallback(id)`
  + 通过 `requestIdleCallback` 返回的id, 取消对应回调

+ `IdleDeadline` 对象
  + 包含一个属性和方法
  + didTImeout: 当它为true时说明 `requestIdleCallback` 设置了`timeout`, 并且超时了
  + 返回一个时间DOMHighResTimeStamp, 并且是浮点类型的数值，它用来表示当前闲置周期的预估剩余毫秒数



