
# 使用 custom elements

Web Components 标准非常重要的一个特性是, 它使开发者能够将HTML页面的功能封装为 custom elements (自定义标签)

## 描述

CustomElementRegistry API 接口的实例(window.customElements)用来处理文档中的 custom elements -- 该对象允许注册一个 custom element

CustomElementsRegistry.define() 用来注册一个 custom element

共有两种 custom elements：

+ Autonomous custom elements(独立元素), 它不继承其他内建的HTML元素(除HTMLElement). 可以直接把这个写成HTML标签形式, 来再页面上使用. 例如 `<custom-element>` 或者 `document.createElement('custom-element')`
+ Customized built-in element (定制的内置的元素), 继承自基本的HTML元素, 在创建时你必须指定所需扩展的元素, 使用时需要先写出基本的元素标签, 并通过`is`属性指定 custom element 的名称. 例如: `<p is="custom-element">` 或者 `document.createElement("p", {is: "custom-element"})`

## 示例

Autonomous custom elements
> 这里要注意一点, 独立元素总是继承自 `HTMLElement`
[详情](https://github.com/mdn/web-components-examples/blob/master/popup-info-box-web-component/main.js)
```js
class PopUpInfo extends HTMLElement {
  constructor() {
    // 必须首先调用 super方法
    super();

    // 元素的功能代码写在这里

    ...
  }
}
```

Customized built-in element
[详情](https://github.com/mdn/web-components-examples/tree/master/expanding-list-web-component)
```js
class ExpandingList extends HTMLUListElement {
  constructor() {
    // 必须首先调用 super方法
    super();

    // 元素的功能代码写在这里

    ...
  }
}
```

## 使用声明周期

在 custom element 的构造函数中, 可以指定多个不同的回调函数, 他们会在元素的不同生命周期被调用

+ connectedCallback : 当 custom element首次被插入文档DOM时, 被调用
+ disconnectedCallback : 当 custom element从文档DOM中删除时, 被调用
+ adoptedCallback : 当custom element被移动到新的文档时被调用
+ attributeChangedCallback : 当custom element 增加, 删除, 修改自身属性时被调用

[例子](https://github.com/mdn/web-components-examples/tree/master/life-cycle-callbacks)
