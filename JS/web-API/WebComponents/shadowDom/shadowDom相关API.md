

# 相关API

## 给指定元素挂载ShadowDom

Element.attachShadow()

方法给指定的元素挂载一个Shadow DOM，并且返回对 ShadowRoot 的引用

要注意的是，不是每一种类型的元素都可以附加到shadow root（影子根）下面。出于安全考虑，一些元素不能使用 shadow DOM（例如`<a>`），以及许多其他的元素。下面是一个可以挂载 shadow root 的元素列表：

+ 任何带有有效名称且可独立存在的自定义元素
+ article
+ aside
+ blockquote
+ body
+ div
+ footer
+ h1~h6
+ header
+ main
+ div
+ p
+ section
+ span

### 语法
```js
var shadowroot = element.attachShadow(shadowRootInit);
```

参数: 
shadowRootInit: Object
  + mode 指定 shadow Dom 的封装模式
    + open shadow root 元素可以从js访问
    + closed 拒绝从js外部访问关闭的shadow root节点
  + delegatesFocus 焦点委托
    + 一个布尔值, 当设置为 true 时, 指定减轻自定义元素的聚焦性能问题行为.当shadow DOM中不可聚焦的部分被点击时, 让第一个可聚焦的部分成为焦点, 并且shadow host（影子主机）将提供所有可用的 :focus 样式.
  + 

### ShadowRoot

通过此API可以通过JS获取 shadow DOM, 继而获取里面的DOM元素

记住shadow DOM 也是一个DOM(继承自 Document), 可以执行DOM操作

```js
Element.shadowRoot
```

相关属性
+ host 返回shadowRoot 附加的宿主DOM
```js
shadowRoot.host
```
+ innerHTML 内部DOM数
+ mode 返回shadowRoot模式, open: 可获取, closed: 不可获取
+ styleSheets 返回 CSSStyleSheet 的 StyleSheetList 对象，用于代表通过链接加载到文档中或内嵌的样式表。


