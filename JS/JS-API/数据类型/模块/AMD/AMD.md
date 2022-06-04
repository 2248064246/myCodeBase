# AMD 规范

AMD 全称是是 Asynchronous Module Definition, 即异步模块加载机制

AMD 是 requirejs 推行的规范, 因此要用 amd 模块, 需要加载 requirejs

其中最重要的是 `define` 函数, 通过这个函数定义模块

**这是一个适用于浏览器的规范**

```js
define(id?, dependencies:[]?, factory:function)

// id: 指定模块名字, 如果没有, 模块的名字默认为加载器请求的指定脚本名字(不允许重复)
// dependencies: 当前模块依赖的其他模块
// factory: 当前模块方法
```

- 如果没有 dependencies, 它默认值是 `["require", "exports", "module"]`

```js
define(function(require, exports, module) {}）
```

factory 是最后一个参数，它包裹了模块的具体实现，它是一个函数或者对象。如果是函数，那么它的返回值就是模块的输出接口或值。

例如定义一个 `myModule` 模块, **模块都需要单独建立一个文件**

```js
define('myModule', ['exports'], function (exports) {
  console.log('myModule is ready');
  // 这里可以通过export导出, 也可以直接通过return导出
  exports.say = () => {
    console.log('hello AMD Module');
  };
});
```

使用这个模块(需要先引入 require.js 文件)

```html
<!-- 先加载模块 -->
<script src="./myModule.js"></script>
<!-- 然后直接通过require方法使用 -->
<script>
  require(['myModule'], function (myModule) {
    console.log(myModule.say());
  });
</script>
```

## require.config 函数配置说明

- paths 指定各个模块的位置. 这个位置可以是服务器的绝对位置, 也可以是本地位置, 而且可以指定多个位置, 如果前一个位置加载失败,就使用后面的

```js
require.config({
  paths: {
    // 注意绝对路劲后面不要带.js 后缀
    jquery: ['//code.jquery.com/jquery-2.2.4'],
  },
});

// 可以直接通过 require 使用
require(['jquery'], ($) => {});
```

- baseUrl 指定本地模块位置的基准目录, 即本地模块的路径是相对于哪个目录的. 这个属性通常由 require.js 加载是的 data-main 属性指定

```html
<script
  src="../../node_modules/requirejs/require.js"
  data-main="./xxx.js"
></script>
```

> 如果有指定 data-main 属性，也就是有指定入口文件，则以入口文件所在的路径为根路径。

- shim 有些库不是 AMD 兼容的，这时就需要指定 shim 属性的值。shim 可以理解成“垫片”，用来帮助 require.js 加载非 AMD 规范的库。

> 这个网上没有一个说明白的

```js
require.config({
  paths: {
    normal: ['./normal'],
  },
  shim: {
    normal: {
      // 这个指定的导出 normal.js 中的指定变量名称
      // 需要normal.js中有这么一个全局变量
      exports: 'A',
    },
  },
});

require(['normal'], function (normal) {
  console.log(normal); // 这里normal代表的就是 A 变量
});
```
