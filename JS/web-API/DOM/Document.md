
# Document

 此接口表示任何在浏览器中载入的网页，并作为网页内容的入口，也就是DOM 树

 Document 接口描述了任何类型的文档的通用属性与方法(包括 HTML, XML, SVG)

 HTML 文档还实现了 HTMLDocument 接口

 ## 构造函数

 `Document()`

## 属性

+ `anchors`
  + 返回文档中所有锚点元素的列表
+ `body`
+ `characterSet`
  + 返回文档正在使用的字符集
+ `compatMode`
  + 返回文档模式
  + BackCompat: 怪异模式
  + CSS1Compat: 标准模式(默认)
+ `documentElement`
  + 返回单前文档的直接子节点, 一般来说是 `html` 元素
+ `documentURI`
  + 返回当前文档路径
+ `fonts`
  + 返回当前文档的 `FontFaceSet` 接口(CSS字体加载API之一)
+ `forms`
  + 返回一个包含当前文档中所有表单元素 `form` 的列表
+ `head`
  + 返回 `head` 元素
+ `hidden`
  + 返回一个Boolean, 表明当前页面是否隐藏(没什么卵用)
+ `images`
  + 返回当前文档中所包含的图片元素列表
+ `links`
  + 返回当前文档中所有链接元素(a 标签)
+ `scripts`
  + 返回文档中所有的 `script` 元素
+ `styleSheetSets`
  + 返回文档上可用样式表的列表 (数组元素是 CSSStyleSheet 类型对象)
+ `timeline`
  + 返回 `DocumentTimeline` 实例, 表示页面加载完成到当前的时间差(即页面打开了多长时间, 刷新会重置)
+ `visibilityState`
  + 返回一个字符串值表示当前文档的可见性
  + 可能值有
    + visible
    + hidden
    + prerender
    + unloaded
+ `readyState`
  + 描述document的状态变化, 有以下三个值:
    + loading
    + interactive: 此时文档已经被解析, 但是诸如图片,样式表, iframe等可能还在加载中.
      + 相当于 `DOMContentLoaded` 事件
    + complete
      + 相当于 `load` 事件
  + readyState 变化会触发 `readystatechange` 事件
+ `pictureInPictureEnabled`
    + 返回一个boolean值, 表示画中画功能是否可用
    + 一般情况下这个功能是默认可用的, 但是现在可以通过 `Feature-Policy: picture-in-picture none` 请求头来在`全局范围`内关闭这个功能.
    + 也可以单独通过`video`元素的`disablepictureinpicture` 属性来关闭(针对单个元素)
+ 


## 方法

+ `adoptNode(externalNode)`
  + 从其他的document文档中获取一个节点. 该节点及它的子节点都会从原文档删除
  + 返回一个可以插入当前文档的节点
+ `createAttribute(attrName)`
  + 创建一个新的 `Attr`对象并返回
+ `createComment(commentData)`
  + commentData: 注释内容, 返回一个注释节点
+ `createDocumentFragment()`
  + 创建一个文档碎片
+ `createElement(tagName)`
  + 用给定标签名 tagName 创建一个新的元素
+ `createEvent(type)`
  + 创建一个指定类型的事件
  + type 可能类型
    + UIEvents
    + MouseEvents
    + MutationEvents
    + HTMLEvents
    + ...
  + [具体参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent#notes)
+ `createNodeIterator(root)`
  + 返回一个新的 `NodeIterator` 对象, root 是遍历起始处的根节点(也就是遍历 root 下面的节点(孩子节点))
+ `createRange()`
  + 返回一个 `Range` 对象
+ `createTextNode` 
  + 返回一个 `Touch` 对象
+ `exitPointerLock()`
  + 可以异步解锁鼠标(通过 Element.requestPointerLock 锁定的)
  + 追踪是否解锁成功, 需要监听 `pointeeerlockchange` `pointerlockerror` 事件
+ `getAnimations()`
  + 返回一个包含文档中所有 `Animation` 对象的数组
  + 可以通过这个对象操作页面中的动画
+ `getElementsByClassName()`
+ `getElementsByTagName()`
+ `hasStorageAccess()`
  + 返回一个 promise 用于判断当前文档是否拥有第一方存储权限(就是在 iframe 中能否获取主页面的 storage 和 cookie)
  + [具体查看Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API)
+ `importNode(externalNode)`
  + 将外部节点拷贝一份, 然后可一个把这个拷贝的节点插入当前文档中
+ `getElementById()`
+ `querySelector()`
+ `querySelectorAll()`
+ `requestStorageAccess()`
  + 向第一方请求存储访问权限
+ `evaluate()`
  + 根据传入的 `XPath` 以及其他参数查找元素, 返回的是一个 `NodeIterator`
  + [具体示例查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/evaluate)


## 事件处理器

诸如 `onclick` 这种...

Document 上支持的来源于 `GlobalEventHandlers`, 并且这个事件在 `HTMLElement`, `window` 上也有

**太庞大了....**

## 事件

使用 `addEventListener` 监听的事件

具体查看 `./事件/事件.md`