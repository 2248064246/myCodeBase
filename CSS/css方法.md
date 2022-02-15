# css 方法

> `calc()` 计算方法

> `var()` 使用变量

> `url()`

> `color-mix(in <colorspace>, <color percentage>{2} )` 再给定颜色空间内, 指定两个颜色, 并返回其混合结果 (很好的方法, 可惜目前没有浏览器支持)

> `attr(attrName [type-or-unit])` 使用`css`属性

目前支持度非常有限(不支持 type 和 unit), 只能够将字符串写入 content 属性

```html
<button data-bg="rgb(123, 0, 0)" data-title="submit">按钮</button>

<style>
  /* 这个无效 */
  button {
    background-color: attr(data-bg color);
  }
  /* 这个有效 */
  button::after {
    content: attr(data-title);
  }
</style>
```

**应用于 filter 属性**

- blur()
- brightness()
- contrast()
- drop-shadow()
- grayscale()
- hue-rotate()
- invert()
- opacity()
- saturate()
- sepia()

**应用于 transform**

- rotate 系列
- translate 系列
- scale 系列
- matrix 系列

**应用于 颜色类**

- rgb()
- rgba()
- hsl()
- hsla()
- linear-gradient()
- radial-gradient()

**应用于 clip-path**

> 这个属性可以裁剪出可显示区域

- inset()
- circle()
- ellipse()
- polygon()
- path()


