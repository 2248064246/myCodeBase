# 长任务 API

它可以直观地告诉我们哪些任务执行耗费了 50 毫秒或更多时间。50 毫秒这个阈值标准来源于

这个标准来源于 [RALL Model](https://web.dev/rail/)

阻塞主线程达 50 毫秒的任务会导致以下问题:

- 可交互实践延迟
- 严重不稳定的交互行为延迟(点击, 滚动等)
- 严重不稳定的事件回调延迟
- 紊乱的动画和滚动()

> w3c 的文档 https://www.w3.org/TR/2017/WD-longtasks-1-20170907/#intro

## 用法

```js
var observer = new PerformanceObserver(function (list) {
  var perfEntries = list.getEntries();
  for (var i = 0; i < perfEntries.length; i++) {
    // Process long task notifications:
    // report back for analytics and monitoring
    // ...
  }
});
// register observer for long task notifications
observer.observe({ entryTypes: ['longtask'] });
// Long script execution after this will result in queueing
// and receiving "longtask" entries in the observer.
```


> [关于一些其他的使用](https://blog.csdn.net/weixin_43964148/article/details/124089667)


