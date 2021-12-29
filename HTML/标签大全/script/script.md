# script 标签

主要注意 js 的解析如何影响主进程， script 的异步执行

还是一点是模块化脚本， 也要注意

## defer 属性

这个属性会告诉浏览器，这个脚本打算在 document 解析完成之后，DOMContentLoaded 事件触发之前执行

> 这个属性无法作用域行内脚本，即使添加了也没有效果

**带有此属性的脚本会按照他们在文档中的顺序执行**

对于模块脚本, 不会有任何效果--模块脚本本身就是 defer

此属性将会消除 `脚本对浏览器的阻塞`

## async

添加此属性， 脚本将会与解析并行下载，并且在完全下载之后立即执行

对于 模块脚本，将会并行下载脚本及脚本引用， 然后在下载完成之后立即执行

> 这个属性无法作用域行内脚本, 即使添加了也没有效果

此属性将会消除`脚本对浏览器的阻塞`

async 不会在 DOMContentLoaded 事件触发之前完成执行, 只能保证会在 load 之前执行

并且 async 脚本的并不能保证按照出现的顺序执行(取决于每个脚本的获取速度)

## 模块脚本

通过添加 `type="module"` 指定这是模块化脚本

模块化脚本默认是 defer 的

这是 ES6 为应对`将JS拆分为可按需导入的模块机制`所增加的属性, 在此之前要实现这个功能需要使用 CommonJS 或 RequireJS 或者 Webpack

这里要注意 `nomoudle` 属性, 使用这个属性标明的脚本将不会被支持 module 的浏览器执行, 而旧的浏览器并不认识这个属性, 所以会执行里面的代码. 这个属性提供了老旧浏览器在不支持 module 脚本情况下的回退方法

模块脚本特性

- 模块内的变量只能在当前模块访问
- 模块内部默认是严格模式
- 模块脚本只能通过服务器方式引用
- 模块脚本有跨域限制, 服务器没有开启 CORS 情况下只能访问同源脚本
- 模块导出的是引用, 而不是克隆的副本.

参见

[Using JS modules in the browser](https://v8.dev/features/modules#mjs)

[ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

[Exploring JS: Modules](https://exploringjs.com/es6/ch_modules.html)

### 模块脚本的按需加载

在模块内部可以使用 `import()` 方法来按需加载需要的模块

这个方法返回一个 promise, promise 结果为对应模块

```js
// 模块脚本内
import('xxx.js').then((Module) => {
  Module.xx(); // 执行模块内对应的方法
});
```


## integrity 属性

web 子资源完整性检查 -- 检查网页中的资源是否是你自己的资源(未被第三方修改)

具体查看 `浏览器相关/Web安全/子资源完整性检查`

