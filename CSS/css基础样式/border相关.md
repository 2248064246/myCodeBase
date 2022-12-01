# border 相关

## border

简写属性, 由 `border-width` `border-style` `border-color` 组成

## border-width

## border-style

- `none` 默认
- `hidden` 类似 `none`, 比`none` 优先级高
- `solid` 一条实线
- `double` 一条双实线
- `dashed` 虚线
- `dotted` 圆点

一下四个不常见, 是带有浮雕效果的边框样式

- `groove`
- `ridge`
- `inset`
- `outset`

## border-color

在没有指定的情况下, 会使用 `color` 属性作为自身值

## 其他相关属性

### 单独设置某个边框

- border-top
- border-left
- border-right
- border-bottom

### border-image

使用 `border-image` 将会替换掉 `border-style`

由以下属性组成 `border-image-source` `border-image-slice` `border-image-width` `border-image-outset` `border-image-repeat`

#### border-image-source

和 `background-image`一样, 可以使用 `ulr` 获取, 也可以使用 `渐变函数`

#### border-image-slice | chrome 15+

此属性会将 `border-image-source`引用的图像划分为 9 个区域, 这些区域组成了一个元素的边框图像

这个 9 个区域分别是: 四个角, 四个边, 以及一个中心区域

![划分](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice/border-image-slice.png)

- 区域 1-4 为角区域（corner region）。每一个都被用于组成最终边框图像的四个角。
- 区域 5-8 边区域（edge region）。在最终的边框图像中重复、缩放或修改它们以匹配元素的大小。
- 区域 9 为中心区域（middle region）。它在默认情况下会被丢弃，但如果设置了关键字 fill，则会将其用作元素的背景图像。

**语法**

```css
border-image-slice: top right bottom left;
```

**取值**

- `<number>` 表示到图像边缘的偏移量，在位图中的单位为像素点，在矢量图中则是坐标。
- `<percentage>` 以原始图像大小的百分比表示的边缘偏移量：水平偏移使用图像的宽度，垂直偏移则使用图像的高度。

#### border-image-repeat | chrome 56+

只作用于 `edge region`

- `repeat`
- `round`
- `space`
- `stretch` 拉伸图像

### border-radius

### border-block | chrome 87+

> 这个属性的目的是为了解决在文字书写方向改变后, border 对应方向问题

简写属性, 由 `border-block-width` `border-block-color` `border-block-style` 组成.

它们的属性取值和 `border` 对应的属性完全一致

`border-block` 可以控制 `border-top` `border-bottom` 或 `border-right` `border-left` 的样式. 具体的需要 `writing-mode` `direction` 控制的文本方向决定

```css
/* 等同于设置 `border-top` border-bottom` */
border-block: solid;
writing-mode: horizontal-tb;
```

### border-line | chrome 87+

> 这个属性的目的是为了解决在文字书写方向改变后, border 对应方向问题

这个　`border-block` 类似, 只是 `border-block` 是用来处理上下 border, 而这个使用来处理左右 border

### border-collapse

用来决定表格边框是分开还是合并的.

- collpase 合并
- separate 分离

### border-spacing

用于控制 表格 的边框的分离距离, 只能在 `border-collapse: separate` 时使用



