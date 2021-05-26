# webpack 基础

[toc]

## 什么是 `webpack`

本质上, `webpack` 是一个现代的 `javaScript` 应用程序的静态模块打包器, 当 `webpack` 处理应用程序时, 它会递归地构建一个依赖关系图, 其中包含应用程序需要的每个模块, 然后将这些模块打包成一个或多个 `bundle` 

> 直白点将就是可让一个文件中引用的多个文件打包成一个文件


## 字符串关键字

+ `[name]` 表示处理的文件名字
+ `[hash]` 表示文件的项目的 `hash` 值
  + hash:8 表示只取8位
+ 

## 概念

### 入口 | entry

> 指示 `webpack` 应该使用哪个模块, 来作为构建其内部依赖视图的开始

> 进入起点后, `webpack` 会找出哪些模块和库是入口起点依赖的

> 每个依赖项随机被处理, 最后输出到称之为 `bundles` 的文件中

### 出口 | output

> `output` 告诉 `webpack` 在哪里输出它所构建的 `bundles`, 以及如何命名这些文件, 默认值为 `./dist`


### loader

> `loader` 可以让 `webpack` 去处理那些非 `javaScript` 文件( webpack 自身只理解 `javaScript`)

> `loader` 可以将所有类型的文件转为 `webpack` 能够处理的有效模块, 然后利用webpack 的打包能力, 对它们进行处理

> **`loader` 能够 `import` 导入任何类型的模块, 这是 `webpack` 特有的功能**

### 插件 | plugins

> 插件可以执行范围更广的任务, 插件的范围包括, 从打包优化和压缩, 一直到重新定义环境中的变量

### 模式 | mode

> 通过选择 `development` 或 `production` 之中的一个, 来设置 `mode` 参数


## 入口起点

### 单个入口语法

```javaScript

module.exports = {
  entry: './src/main.js'

  //  entry 可以传入一个数据(文件路径), 将创建多个主入口

  // entry: ['./main.js', './index.js'], // 实际上最终打包的文件只有一个, 两个文件会合并, 文件名默认是第一个文件(就是相当于 index.js 中的内容打包到了 main.js 里面)
}

```

### 对象语法


####  使用对象语法常见的的场景

 + **分离 应用程序 和 第三方库(vendor) 入口**
  ```javaScript
  module.exports = {
    entry: {
      app: './src/main.js',
      vendors: './src/vendors.js'
    }
  }

  ```

#### 多页面应用程序

+ 在多页应用中，（译注：每当页面跳转时）服务器将为你获取一个新的 HTML 文档。页面重新加载新文档，并且资源被重新下载。
```javaScript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
}
```

### 动态入口
> 动态加载的模块不是入口起点
```javaScript
 {
    entry: () => './demo',
    // 或者
    entry: () => new Promise((resolve) => resolve(['./demo', './demo2']))
 }

```


## 输出(output)

> 可以存在多个 `入口`起点, 但是只指定一个 `输出` 配置

+ 参数配置
  + `filename` 指定文件输出的名字
  + `path` 指定文件输出位置, 这是一个绝对路径

### 最简单配置

```javaScript

module.exports = {
  output: {
    filename: 'bundle.js', 
    // 如果 `webpack.config.js` 文件不是在最外层目录, 而是在里面的目录, 需要用到 `path` 模块进行处理
    path: path.resolve(__dirname, './dist')
    // 这里 path 需要是绝对路径
  }
}

```

### 多个入口起点
```javaScript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist' // 这里居然可以直接这么写...
  }
}

```

## 模式(mode)

> 设置模式时, 会将 `process.env.NODE_ENV` 设置为对应值

```javaScript
module.exports = {
  mode: 'production' // development 和 production 在webpack 处理的时候是有区别的
  // webpack 会进行不同的优化
}

```

## loader

### 使用loader
+ 在 `webpack.config.js` 中指定loader
+ 在每个 `import` 语句中显示指定loader
  ```javaScript
    import Styles from 'style-loader!css-loader?modules!./styles.css';
  ```
+ 在 `CLI (命令行界面)` 中指定


### 插件(plugins)


### 配置(config)

webpack 配置是标准的 `Node.js CommonJS` 模块, 你可以
  + 通过 `require()` 导入其他文件
  + 通过 `require()` 使用 `npm` 工具函数
  + 通过 JavaScript 控制流表达式
  + 设置变量, 常量
  + 编写执行函数生成配置







