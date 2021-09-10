
# 使用shadowDom

Web Components 的一个重要属性是封装--可以将标记结构, 样式和行为(js能隔离吗?)隐藏起来, 并与页面上的其他代码相隔离, 保证不同的部分不会混在一起, 这可使代码更加干净, 整洁.

其中，Shadow DOM 接口是关键所在，它可以将一个隐藏的、独立的 DOM 附加到一个元素上。

## 描述

Shadow DOM 允许将隐藏的 DOM 树(这个很关键)附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样。

特有术语:
+ Shadow host：一个常规 DOM节点，Shadow DOM 会被附加到这个节点上。
+ Shadow tree：Shadow DOM内部的DOM树。
+ Shadow boundary：Shadow DOM结束的地方，也是常规 DOM开始的地方。
+ Shadow root: Shadow tree的根节点。

可以使用同样的方式来操作 Shadow DOM，就和操作常规 DOM 一样——例如添加子节点、设置属性，以及为节点添加自己的样式（例如通过 element.style 属性），或者为整个 Shadow DOM 添加样式（例如在 `<style>` 元素内添加样式）。不同的是，Shadow DOM 内部的元素始终不会影响到它外部的元素（除了 :focus-within），这为封装提供了便利。

Shadow DOM 标准允许你为你自己的元素（custom element）维护一组 Shadow DOM。

## 基本用法

可以使用 Element.attachShadow() 方法来将一个 shadow root 附加到任何一个元素上。它接受一个配置对象作为参数，该对象有一个 mode 属性，值可以是 open 或者 closed：

```js
let shadow = elementRef.attachShadow({mode: 'open'});
let shadow = elementRef.attachShadow({mode: 'closed'});
```

open 表示可以通过页面内的 JavaScript 方法来获取 Shadow DOM

如果你将一个 Shadow root 附加到一个 Custom element 上，并且将 mode 设置为 closed，那么就不可以从外部获取 Shadow DOM 了——`myCustomElem.shadowRoot` 将会返回 `null`。浏览器中的某些内置元素就是如此，例如`<video>`，包含了不可访问的 Shadow DOM。

## 给shadowDom添加自己的样式

可以通过 element.textContent 方式
```js
// 为 shadow DOM 添加一些 CSS 样式
var style = document.createElement('style');
style.textContent  = `样式`
```


通过link

```js
// 将外部引用的样式添加到 Shadow DOM 上
const linkElem = document.createElement('link');
linkElem.setAttribute('rel', 'stylesheet');
linkElem.setAttribute('href', 'style.css');

// 将所创建的元素添加到 Shadow DOM 上
shadow.appendChild(linkElem);
```

注意: 因为`<link>` 元素不会打断 shadow root 的绘制, 因此在加载样式表时可能会出现未添加样式内容（FOUC），导致闪烁

许多现代浏览器都对从公共节点克隆的或具有相同文本的`<style>` 标签实现了优化，以允许它们共享单个支持样式表，通过这种优化，外部和内部样式的性能表现比较接近。