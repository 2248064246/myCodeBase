

# Webpack 热更新

[参考](https://cloud.tencent.com/developer/article/1551693)

## 概述

`Hot Module Replacement` 简称 `HMR`, 无需刷新整个页面的同事, 更新模块

能够节省开发时间, 提高效率

刷新我们一般分为两种：
+ 一种是页面刷新，不保留页面状态，就是简单粗暴，直接window.location.reload()。
+ 另一种是基于WDS (Webpack-dev-server)的模块热替换，只需要局部刷新页面上发生变化的模块，同时可以保留当前的页面状态，比如复选框的选中状态、输入框的输入等。

## 基本原理

项目启动后, webpack 会生成一个全局hash, 每次修改文件编译后都会生产新hash, 然而新文件的hash 会使用以前的

会生成新的 hash.hot-update.json, chunk.hash.hot-update.js 等文件, webpack会通知浏览器需要重新请求那些文件(通过websocket)

## 实现原理

### webpack-dev-serve 本地服务

+ 启动webpack，生成compiler实例。compiler上有很多方法，比如可以启动 webpack 所有编译工作，以及监听本地文件的变化。
+ 使用express框架启动本地server，让浏览器可以请求本地的静态资源。
+ 本地server启动之后，再去启动websocket服务，如果不了解websocket，建议简单了解一下websocket速成。通过websocket，可以建立本地服务和浏览器的双向通信。这样就可以实现当本地文件发生变化，立马告知浏览器可以热更新代码啦！



