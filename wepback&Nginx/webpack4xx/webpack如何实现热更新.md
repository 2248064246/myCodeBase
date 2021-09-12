

# Webpack 热更新

## 概述

`Hot Module Replacement` 简称 `HMR`, 无需刷新整个页面的同事, 更新模块

能够节省开发时间, 提高效率

刷新我们一般分为两种：
+ 一种是页面刷新，不保留页面状态，就是简单粗暴，直接window.location.reload()。
+ 另一种是基于WDS (Webpack-dev-server)的模块热替换，只需要局部刷新页面上发生变化的模块，同时可以保留当前的页面状态，比如复选框的选中状态、输入框的输入等。



