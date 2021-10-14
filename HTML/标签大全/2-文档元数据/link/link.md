
# link 元素

HTML外部资源链接元素 `(<link>)` 规定了当前文档与外部资源的关系。

+ 空标签
+ 单标签
+ 可以在head和body中

> `<link>`元素可以出现在`<head>`元素或者`<body>`元素中，具体取决于它是否有一个`body-ok`的链接类型。例如，stylesheet链接类型是`body-ok`的，因此`<link rel="stylesheet">`允许出现在body中。然而，这不是一种好的可遵循的实践方式；更合理的方式是，将你的`<link>`元素从你的body内容中分离出来，将其放在`<head>`中。

## 作用

+ 链接样式表
+ 设置站点图标
+ 预加载资源


## 设置站点图标

```html
<link rel="icon" href="favicon.ico">
```

## 使用媒体查询加载对应的样式
> 这种资源将只在满足媒体条件的情况下才被加载进来
```html
<link href="print.css" rel="stylesheet" media="print">
<link href="mobile.css" rel="stylesheet" media="screen and (max-width: 600px)">
```


## 预加载

将rel设定为preload，表示浏览器应该预加载该资源

```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">

<!-- 后续可以直接请求 -->
<link rel="stylesheet" href="style.css">

```
需要 `as` 属性指定预加载的是什么资源, 以便浏览器做出优化
+ 更准确地确定资源加载的优先级。
+ 存储在缓存中以供将来请求，如果需要，可以重复使用资源。
+ 将正确的内容安全策略应用于资源。
+ 设置正确的请求头。

可以应用于as属性的值
+ audio
+ document
+ fetch 需要通过fetch或XHR请求访问的资源
+ font
+ image
+ script
+ style
+ worker javascript脚本(worker脚本)
+ video

预加载时需要注意一个属性 `crossorigin`, 表示是否使用CORS加载资源, 它有两个值:
+ anonymous 
+ use-credentials
[更多详情参阅MDN link](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link)

