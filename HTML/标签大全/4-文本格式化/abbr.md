# abbr

> 用于定义缩写的标签, 并且可以通过 `title` 属性来展示完整信息

```html
<p>
  <abbr title="Cascading Style Sheets">CSS</abbr>
  sss
</p>
```

`abbr` 是行内元素

默认样式:

- 一些浏览器, 例如 IE, 对它添加的样式和 `span` 完全相同
- 现代浏览器会添加 **一条点状下划线**
- 有一些浏览器可能还会添加大写或者大写样式.

## 配合 dfn 元素定义一个正式的缩写

```html
<p>
  <dfn id="html"><abbr title="HyperText Markup Language">HTML</abbr></dfn>
  is a markup language used to create the semantics and structure of a web page.
</p>
```
