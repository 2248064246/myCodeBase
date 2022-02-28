# HMR

Hot Module Replace 模块热更新

## 原理

1. webpack-dev-server 会启动一个静态资源服务
2. 页面会通过 websocket 和服务器通信
3. webpack 监听到文件变化, 增量构建发生变更的模块, 并通过 WebSocket 发送 hash 事件
4. 浏览器接收到 hash 事件后, 请求 manifest 资源文件, 确认增量变更范围
5. 浏览器加载发生变更的增量模块
