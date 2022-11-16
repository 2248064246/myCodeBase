# box-decoration-break | chrome 22+ \*

这个属性浏览器支持度不完全, 需要使用 `-webkit--` 前缀

这个属性的作用是在使用 `<br>` 进行换行的文本中, 保持其整体的样式.

例如如果有 `border` `背景` `阴影` 等效果, 每一行都会完整呈现, 而不会被打断.

- `slice` 默认
- `clone` 每个框片段与指定的边框、填充和边距独立呈现

```html
<style>
  .example {
    background: linear-gradient(to bottom right, yellow, green);
    box-shadow: 8px 8px 10px 0px deeppink, -5px -5px 5px 0px blue,
      5px 5px 15px 0px yellow;
    padding: 0em 1em;
    border-radius: 16px;
    border-style: solid;
    margin-left: 10px;
    font: 24px sans-serif;
    line-height: 2;
  }
</style>
…
<span class="example">
  The
  <br />
  quick
  <br />
  orange fox
</span>
```

![](https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break/box-decoration-break-inline-slice.png)

添加 box-decoration-break: clone 样式之后：

```css
-webkit-box-decoration-break: clone;
box-decoration-break: clone;
```

![](https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break/box-decoration-break-inline-clone.png)
