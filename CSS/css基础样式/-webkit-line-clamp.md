# -webkit-line-clamp | chrome6+

可以把`块容器`中的内容限制为指定的行数

**一般用于多行文本省略**

只有在 `display` 设置为 `-webkit-box` 或 `-webkit-inline-box` 并且 `-webkit-box-orient`属性设置为 `vertical` 时才有效果.

一个简单的例子, 超过 3 行在末尾显示省略号

```css
p {
  width: 300px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```
