# plugin_loader

## 概念

### plugin 在何时启动

plugin 的执行通过监听 webpack 广播的 hook 来在对应阶段启动, 因此 plugin 可以应用于整个 webpack 生命周期

### loader 在何时启动

loader 在 webpack 检索 module 的时候运行, 用于将 module 通过匹配的 loader 转为 webpack 能够处理的数据


