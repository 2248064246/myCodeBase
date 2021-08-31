
# 我们为什么需要 WebWorker

[相关参考](https://zhuanlan.zhihu.com/p/393428948)

## 无法预测的性能问题

按照 [RAIL模型](https://web.dev/rail/)灵敏 意味着响应用户行为的时间控制在 100ms 内，而 流畅 意味着屏幕上任何元素移动时 稳定在 60 fps。所以，我们作为开发者 拥有 1000ms/60 = 16.6ms 的时间 来生成每一帧，这也被称作 “帧预算”（frame budget）。

+ 有很多因素会影响浏览器的渲染

+ 设备性能差异巨大

+ 高刷新率屏幕越来越普及, 帧预算时间缩短

## JavaScript

JS 被设计为与浏览器的主渲染循环同步运行.

这种设计的缺点是: 执行缓慢的 JS 代码会阻塞浏览器渲染任务. 可以理解为如果其中一个没有完成, 另一个就不能继续

为了让长时间的任务呢能在JS中协调运行, 基于回调以及后来的Promise异步模型被建立起来


## webworker

将一些js任务转移到 worker中, 防止对渲染任务的阻塞

> [google 的一个worker库 -- Comlink](https://github.com/GoogleChromeLabs/comlink) 它能帮助实现 主线程 和 Worker 互相访问彼此对象。使用 Comlink 的时候，你完全不用管 postMessage。唯一需要注意的一点是，由于 postMessage 的异步性，函数并不会返回结果，而是会返回一个 promise。

> [google 基于worker开发的一个js扫雷游戏](https://github.com/GoogleChromeLabs/proxx) -- [项目说明](https://www.infoq.cn/article/qNE*6zqUhD4M6WL0QxJ2) 好强大啊

