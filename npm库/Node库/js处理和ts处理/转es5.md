# 转 ES5

## 认识 babel

babel 能够做到:

1. 语法转换
2. Polyfill 目标环境缺失的特性(需要用到第三方库: core-js)
3. 源码转换
4. jsx, ts 转换

## 使用

```shell
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

创建一个 `babel.config.json` 文件(需要 babel 7.8 及以上版本, 低版本的是 .babelrc 文件), 写入以下内容

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

上面的`targets`配置是随意编写的, 更加完善的配置请查看 [browserslist](https://github.com/browserslist/browserslist#queries)

为了更好的适配浏览器, 也可以单独建立 `.browserslistrc` 来指定兼容目标

```
defaults
```

> 最佳的配置往往就是默认配置

同样这个配置还可写入在 `package.json` 文件中

```json
"browserslist": [
    "defaults"
]
```

关于 `useBuiltIns` 需要特殊特别注意:

- usage
  - 会根据单前配置的环境来判断是否需要添加 polyfill
- entry
  - 不会判断环境, 需要自己手动引入
  - 不懂这个..., 开发中尽量用 usage

使用 `useBuiltIns: usage` 配置打包出来的 js

```shell
npx babel .\main.js -o main.es5.js
```

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "defaults",
        "useBuiltIns": "entry",
        "corejs": "3.22.5"
      }
    ]
  ]
}
```

```js
'use strict';

require('core-js/modules/es.array.from.js');

require('core-js/modules/es.string.iterator.js');

require('core-js/modules/es.object.to-string.js');

require('core-js/modules/es.promise.js');

require('core-js/modules/es.array.flat.js');

require('core-js/modules/es.array.unscopables.flat.js');

/*
 * @Author: huangyingli
 * @Date: 2022-05-18 16:27:18
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-05-18 16:39:00
 * @Description:
 */
var a = Array.from('123');
var b = new Promise();
var c = [[1, 2]].flat();

var x = function x() {
  return '1';
};
```

## 基础指令

| 指令 | 说明                                   |
| ---- | -------------------------------------- |
| -o   | 指定输出文件名                         |
| -w   | 监听文件变化                           |
| -s   | 生成 source-map 文件                   |
| -d   | 将文件输出到这个目录(用于编译整个目录) |


```shell
npx babel src -d lib
```


## 编译 typescript

需要 `@babel/preset-typescript @babel/plugin-transform-typescript`

