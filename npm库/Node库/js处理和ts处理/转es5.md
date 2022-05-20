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

src 下面整个目录编译

```shell
npx babel src -d lib
```

## 编译 typescript

需要 `@babel/preset-typescript @babel/plugin-transform-typescript`

配置

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"],
  "plugins": ["@babel/plugin-transform-typescript"]
}
```

ts 代码

```ts
/*
 * @Author: huangyingli
 * @Date: 2022-05-18 18:15:26
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-05-18 18:23:42
 * @Description:
 */

interface Man {
  height: number;
  heavy: number;
  say(): void;
}

class bbbssss implements Man {
  height: number;
  heavy: number;
  constructor() {
    this.height = 10;
    this.heavy = 120;
  }
  say(): void {
    console.log('hello');
  }
}

let aryss: Array<number> = [1, 2, 3];
```

编译后代码

```js
'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}

/*
 * @Author: huangyingli
 * @Date: 2022-05-18 18:15:26
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-05-18 18:23:42
 * @Description:
 */
var bbbss = /*#__PURE__*/ (function () {
  function bbbss() {
    _classCallCheck(this, bbbss);

    this.height = 10;
    this.heavy = 120;
  }

  _createClass(bbbss, [
    {
      key: 'say',
      value: function say() {
        console.log('hello');
      },
    },
  ]);

  return bbbss;
})();

var arys = [1, 2, 3];
var cy = 123;
```

## polyfill 方案

### @babel/polyfill

使用方法

1. 在项目的入口引入

```js
module.exports = {
  entry: ['@babel/polyfill', './app/js'],
};
```

2. 在项目 index.js 中引入

```js
import '@babel/polyfill';
```

此时要注意(如果与 `@babel/preset-env` 一起使用):

- 如果使用 `useBuiltIns: 'usage'` 则不用`import`手动引入
- 如果`useBuiltIns: entry` 则需要手动引入

## core-js

全量引入, 完全等同于 `@babel/polyfill`

```js
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

按需引入需要注意点, 参考官网
(使用 webpack `useBuiltIns: usage` 就能很好实现)

## 关于 @babel/plugin-transform-runtime

这个主要用于 npm 库的开发者使用

它的主要作用是将 core-js 等 polyfill 的代码和环境的全局对象隔离, 防止他们污染全局对象.(通常来说, core-js 等 polyfill 会在 Array 或其他全局类上修改, 对于某些库的开发者来说, 他可能也修改全局对象, 这就会导致冲突.)

> 基于最新版本的 babel 来说, 用于实际项目中也没有问题(会增大一点体积)

> [网络上有说](https://zhuanlan.zhihu.com/p/147083132)会导致 `@babel/preset-env` 无效, 会引入整个 polyfill 而增大代码体积的情况, 至少在目前最新版本来说没有这种情况, polyfill 依旧是按需引入





