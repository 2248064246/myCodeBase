# css 及 css 预处理器

## style-loader css-loader

```shell
npm i -D style-loader css-loader
```

- style-loader 用于将 css 写入 DOM
- css-loader 用于解析 css 文件, 并处理 css 中的`@import`和`url()`

一些重要的配置参数

**`style-loader`**

- `injectType`
  把 css 插入到 DOM 中的方式.

  - `styleTag` 默认. 通过使用多个 style 标签方式
  - `singletonStyleTag` 只使用一个 style 方式

- `insert` 默认 `head`
  指定`<style>`插入的位置. `head`|`body`

**`css-loader`**

- `sourceMap` | `Boolean`
  启用或者禁用 SourceMap

  在默认情况下和 `devtool` 有关系, 设置了`devtool` 则也会开启此选项

- `importLoaders` | Number

  允许配置在`css-loader`之前有多少`loader`用于 `@import`资源与 css 模块的导入. 默认`0`

  (这里的前面指的是拍下 css-loader 后面的 loader)

  ```js
  {
    test: /\.css$/i,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 2,
          // 0 => no loaders (default);
          // 1 => postcss-loader;
          // 2 => postcss-loader, sass-loader
        },
      },
      "postcss-loader",
      "sass-loader",
    ],
  }
  ```

## postcss-loader

用于处理 css 的兼容问题. 支持转义未来 css 语法. 支持对`css模块`的名称混淆, 而使其只作用于单前页面. 通过使用`stylelint`能够支持 css 检测

```shell
cnpm i -D postcss-loader postcss
```

需要在目录下建立一个 `postcss.config.js` 文件, 用于配置`postcss`的插件和其他设置

### 常用 postcss 插件

- `autoprefixer`

自动化前缀的插件

这个需要 `browserslist`配合使用

可以告知 `autoprefixer`需要适配到什么样的浏览器为止

- `postcss-pxtorem`

rem 适配方案的插件. 能够将 css 中 px 单位转为 rem 单位

- `postcss-preset-env`

支持对新的 css 语法进行转义已支持旧版浏览器

这个插件也需要 `browserslist`

- `postcss-nano`

用于缩小最终 css 体积的插件. (通过合并 css 为更简单的语法, 或者选择器合并等操作实现)
