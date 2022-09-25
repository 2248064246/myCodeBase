
# Element

## 属性

+ `attributes`
  + 返回一个与该元素相关的所有属性集合 `NameNodeMap` 对象
  + 可以通过数组形式索引, 也可以通过属性名索引
+ `classList`
  + 返回该元素的class属性值, 是一个类数组, `DOMTokenList`
+ `className`
  + 返回该元素的class属性值, 是一个String
+ `clientHeight`
+ `clientWidth`
+ `clientTop`
+ `clientLeft`
+ `id`
  + 元素的ID属性值
+ `innerHTML`
+ `nextElementSibling`
+ `previousElementSibling`
+ `outerHTML`
  + 返回或者设置(包括自身)的内容
+ `scrollHeight`
+ `scrollWidth`
+ `scrollLeft`
+ `scrollTop`
+ `shadowRoot`
+ `tagName`
  + 返回大写的标签名
  
## 方法
+ `append((Node or DOMString)`
  + 在当前元素末尾插入一组Node节点或DOMString对象, DOMString等价Text节点.
  + 与 `Node.appendChild`的差别
    + `Element.append`允许插入DOMString, `Node.appendChild` 只允许插入Node节点
    + `Element.append`允许插入多个, `Node.appendChild`只允许插入一个
    + `Element.append`没有返回值, `Node.appendChild`返回插入的节点
+ `attachShadow()`
  + 和 shadowDOM 有关的方法
+ `getAnimations()`
  + 返回在当前元素上活动的 `Animation` 对象数组
+ `getAttribute(attributeName)`
+ `getAttributeNames()`
  + 返回一个数组, 包含当前元素所有属性名称. 没有属性则返回空数组
+ `getBoundingClientRect()`
  + 返回元素大小, 及相对视口位置, 返回值是一个 `DOMRect` 对象
  + width/height 和元素的盒子模型有关(box-sizing)
+ `getClientRects()`
  + 返回该元素的矩形集合
  + 这个方法对行内元素和块级元素有点区别...[具体查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects)
+ `getElementsByClassName()`
+ `getElementsByTagName()`
+ `hasAttribute(attributeName)`
+ `insertAdjacentElement(position, element)`
  + 将元素插入到相对于当前元素给定的一个位置
  + position有以下值:
    + beforebegin: 在当前元素前面
    + afterend: 在当前元素后面
    + beforeend: 在元素的最后一个孩子后面, 等同于 appendChild
    + afterbegin: 在元素的第一个孩子前面
+ `insetAdjacentHTML(position, text)`
  + position 属性同上
  + 会把text作为DOM解析, 同时插入, 作用类似 `innerHTML`, 但是性能好点
+ `insetAdjacentText(position, text)`
  + 把文本插入指定位置...
+ `querySelector()`
+ `querySelectorAll()`
+ `releasePointerCapture(pointerId)`
  + 释放鼠标捕获
+ `removeAttribute(attributeName)`
+ `requestFullscreen()`
  + 用于发出异步请求使元素进入全屏模式。
  + **在控制台, 通过html元素调用可以进入全屏模式**
+ `requestPointerLock()`
  + 将鼠标指针锁定在指定元素上
+ `scroll(x-coord, y-coord)`
  + 在给定的元素中滚动到某个特定坐标
+ `scrollBy(x-distance, y-distance)`
  + 是使得元素滚动一段特定距离
+ `scrollTo(x-coord, y-coord)`
  + 使界面滚动到给定元素的指定坐标位置
+ `setAttribute(name, value)`
+ `setPointCapture(pointeId)`
  + 用于将特定元素指定为未来指针事件的捕获目标。指针的后续事件将以捕获元素为目标，直到捕获被释放
  + 指针捕获允许一个特定的指针事件(PointerEvent) 事件从一个事件触发时候的目标重定位到另一个目标上。这个功能可以确保一个元素可以持续的接收到一个pointer事件，即使这个事件的触发点已经移出了这个元素
+ `toggleAttribute(attributeName)`
  + 切换给定元素的某个布尔值属性的状态（如果属性不存在则添加属性，属性存在则移除属性）
  
