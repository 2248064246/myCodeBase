# 编译加速

## 使用缓存

使用缓存能够显著加快第二次编译速度

1. HardSourceWebpackPlugin

[介绍](https://www.npmjs.com/package/hard-source-webpack-plugin)

```js
// webpack.config.js
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  plugins: [new HardSourceWebpackPlugin()],
};
```

2. cache-loader

这个不推荐使用, 需要手动加到 js,css 解析的 loader 前面, 操作麻烦.

**并且, 在和 less, css 中使用的时候, 会造成 build 打包后的样式文件丢失问题**

3. webpack 自带的缓存功能

4. babel 缓存

## 多线程编译

开启多线程需要时间, 线程之间通信也需要时间. 使用多线程需要一定考量

1. happypack

不再维护了, 不要再用

2. thread-loader

这是 happypack 的一个升级版本. happypack 的开发者推荐再 webpack4 中使用`tread-loader`来代替`happypack`

**实际上和 vue 配合使用时, 会有问题, 需要支持多项的 loader 才能和 tread-loader 一起使用**
