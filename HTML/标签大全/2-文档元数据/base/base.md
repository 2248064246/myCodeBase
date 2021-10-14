
# base 元素

指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 `<base>` 元素


+ 空元素
+ 单标签
+ 只能写在 head 标签开头

一个文档的基本 URL, 可以通过使用 `document.baseURI` 的 JS 脚本查询。如果文档不包含 `<base>` 元素，baseURI 默认为 document.location.href。


## 属性

+ href
  > 用于文档中相对 URL 地址的基础 URL。允许绝对和相对URL。


+ target
  + _self
  + _blank
  + _parent 载入结果到父级浏览上下文（如果当前页是内联框）
  + _top 载入结果到顶级浏览上下文（该浏览上下文是当前上下文的最顶级上下文）

## 多个 base 元素

如果指定了多个 `<base>` 元素，只会使用第一个 href 和 target 值, 其余都会被忽略。

## 使用示例

1. 页内锚点
```html
<base href="https://example.com">
<a href="#anchor">Anker</a>
<!-- 结果  https://example.com/#anchor -->
```

2. 特殊情况
```html
<base href="www.baidu.com" target="_blank">
<a href="http://cn.bing.com" target="_self">必应</a>

<!-- 这个a标签将不会应用base标签的设置 -->
```