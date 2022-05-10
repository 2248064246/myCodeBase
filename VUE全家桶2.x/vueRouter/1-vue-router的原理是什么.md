# vue-router 原理

Vue-router 在 web 上主要有两种路由模式

- hash
- history

history 模式通过 url 中路径来导航, 主要实现原理是 web History API 中的 pushState 和 replaceState 这两个在改变 url 中的 path 不会引起页面刷新.
另外还提供了 popstate 这个事件来监听浏览器动作导致的 url 变化(后退, 前进)

> 只要 url 改变, 即便只改变 hash 也会生成浏览器历史

hash 模式通过 url 中的 hash 值来导航, 可以通过 hashchange 事件来监听 hash 变化, 从而做出对应跳转

> HashChangeEvent 接口表示一个变化事件，当 URL 中的片段标识符发生改变时，会触发此事件。片段标识符指 URL 中 # 号和它以后的部分。


