# filter

此属性不但可以使用内置的一些滤镜方法, 还可使使用 SVG 的滤镜元素

## Filter 函数

### blur(radius) 高斯模糊

radius 制定了高斯函数的标准偏差值, 或者屏幕上有多少像素互相融合, 因此越大的值会产生更多的模糊.此参数被指定为 CSS 长度, 但是不接受百分比值.

```css
filter: blur(10px);
```

svg 版本

```html
<svg>
  <filter id="gooey">
    <!-- 高斯模糊 -->
    <feGaussianBlur in="SourceGraphic" stdDeviation="15"></feGaussianBlur>
  </filter>
</svg>
```

### brightness() 明亮度

值可以是数字也可以是百分比, 0% 是完全的黑色, 100%保持不变, 超过 100%将会更亮

```css
filter: brightness(0.5);
```

svg 版本

在svg可以设置每个通道的明亮度, 而且可以指定处理函数类型
type有4中 https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer
slope的和 css的brightness的数值对应, 1为正常, 小于1变暗, 大于变量
```html
<svg>
  <filter id="brightness">
    <feComponentTransfer>
      <feFuncR type="linear" slope="0.5" />
      <feFuncG type="linear" slope="0.5" />
      <feFuncB type="linear" slope="2" />
    </feComponentTransfer>
  </filter>
</svg>
```
`feComponentTransfer` 允许四种子元素 `feFuncR` `feFunG` `feFunB` `feFunA` 分别对应rgba四个通道
