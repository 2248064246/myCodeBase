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

在 svg 可以设置每个通道的明亮度, 而且可以指定处理函数类型
type 有 4 中 https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer
slope 的和 css 的 brightness 的数值对应, 1 为正常, 小于 1 变暗, 大于变量

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

`feComponentTransfer` 允许四种子元素 `feFuncR` `feFunG` `feFunB` `feFunA` 分别对应 rgba 四个通道

### contrast() 对比度

值允许百分比和数字, 默认 100%. 0%将是完全的灰色, 可以超过 100%

```css
filter: contrast(50%);
```

svg, 其中 -(0.5 \* amount) + 0.5 需要手动计算出来, 不能直接写公式

svg 和 css 中使用的色彩空间不同, 如果要想 svg 的效果和 css 一直, 则需要更改 svg 的色彩空间

```html
<svg color-interpolation-filters="sRGB">
  <filter id="contrast">
    <feComponentTransfer>
      <feFuncR
        type="linear"
        slope="[amount]"
        intercept="-(0.5 * [amount]) + 0.5"
      />
      <feFuncG
        type="linear"
        slope="[amount]"
        intercept="-(0.5 * [amount]) + 0.5"
      />
      <feFuncB
        type="linear"
        slope="[amount]"
        intercept="-(0.5 * [amount]) + 0.5"
      />
    </feComponentTransfer>
  </filter>
</svg>
```

### drop-shadow(offset-x, offset-y, blur-radius, color) 阴影效果

阴影可以设置模糊度的，以特定颜色画出的遮罩图的偏移版本，最终合成在图像下面.

相比较于 box-shadow, 滤镜能够更好的提供硬件加速

```css
filter: drop-shadow(0 10px 10px #888);
```

```html
<svg color-interpolation-filters="sRGB">
  <filter id="drop-shadow">
    <feGaussianBlur in="SourceAlpha" stdDeviation="[radius]" />
    <feOffset dx="[offset-x]" dy="[offset-y]" result="offsetblur" />
    <feFlood flood-color="[color]" />
    <feComposite in2="offsetblur" operator="in" />
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</svg>
```

### grayscale() 灰度

值为 0%到 100%之间, 允许数值, 默认 0. 100%为完全灰度

```css
filter: grayscale(100%);
```

svg 的灰度有点特别, 下面这个使用的是加权平均方式. 这个的结果和 css 的 grayscale(100%) 是一致的
[参见](https://zhuanlan.zhihu.com/p/384374529)

```html
<svg color-interpolation-filters="sRGB">
  <filter id="grayscale">
    <feColorMatrix
      type="matrix"
      values="
				  .299 .587 .114 0 0
				  .299 .587 .114 0 0
				  .299 .587 .114 0 0
				   0  0  0 1 0 "
    />
  </filter>
</svg>
```

css 中 grayscale 可以指定多种数值, svg 如何实现呢?

**svg 中使用饱和度设置可以近乎替代 css 中的 grayscale. 0.5 就是代表 50%的灰度**
[参见](https://stackoverflow.com/questions/23255248/w3c-grayscale-svg-filters)

```html
<svg color-interpolation-filters="sRGB">
  <filter id="grayscale">
    <feColorMatrix type="saturate" values="0.5" />
  </filter>
</svg>
```


