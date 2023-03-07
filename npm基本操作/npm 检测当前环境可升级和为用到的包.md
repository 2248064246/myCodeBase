# 检测当前 package.json 中未使用的包

这些检测都会有一个问题: package.json 中没有写的包, 但是可能会再 node_modules 中.

因为有一些包会强依赖一些其他包, npm 在下载这个包的时候, 也会下载对应的依赖包.

所以会出现命名 package.json 中没有这个包, 但是依然能够使用的情况

## depcheck 包

```shell
npm i -g depcheck
```

然后再项目下执行 `depcheck`, 会列出`package.json`中存在但是未使用的包, 以及用了但是不存在于`package.json`中的包.

**会有一个简洁清晰的输出**

```shell
Unused dependencies
* babel-runtime
* echarts-liquidfill
* node-notifier
* vue-quill-editor
Unused devDependencies
* @babel/preset-es2015
* @babel/runtime
* @types/core-js
* babel-eslint
* babel-plugin-polyfill-corejs3
* cssnano
* file-loader
* happypack
* os
* postcss-import
* postcss-preset-env
* postcss-safe-parser
* thread-loader
* vue-style-loader
* vue-template-compiler
* webpack-cli
Missing dependencies
* autoprefixer: .\postcss.config.js
* codemirror: .\src\pages\app\transposition\interface-manage\components\CodeUI.vue
* regenerator-runtime: .\src\entry\index.js
```

**需要特别注意, 没有通过 required 或者 import 的包并不一定就意味着它在项目中没有被使用, 通常这些包极有可能在webpack的loader中被使用**

## npm-check 包

这个包的功能类似 `depcheck`, 不过输出信息更加丰富. 不仅包括了使用/未使用的包信息, 还会提供当前包的版本信息以及可升级的版本信息.

## npm prune 命令

这个命令用于删除项目的无关包, 可以指定项目名称, 也可以指定单独需要删除的包.
