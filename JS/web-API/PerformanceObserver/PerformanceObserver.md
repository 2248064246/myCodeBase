# 性能监测 API

在浏览器的性能时间轴记录下一个新的 performance entries 的时候将会被通知 。

## 构造函数

PerformanceObserver()

## 方法

observe() 用于监听性能

disconnect() 用于停止监听

```js
function perf_observer(list, observer) {
  // Process the "measure" event
  // 处理 "measure" 事件
}
var observer2 = new PerformanceObserver(perf_observer);
observer2.observe({ entryTypes: ['measure'] });
```
