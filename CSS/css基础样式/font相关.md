# font 相关

## font

`font` 属性是以下属性的简写

- `font-style`
- `font-size`
- `font-family`
- `font-height`
- `line-weight`
- `font-variant`
- `font-stretch`

其中必须包含: `font-size` `font-family`, 其余可选

`font-style` `font-variant` `font-weight` 必须在 `font-size`之前

`font-family` 必须最后一个指定

`line-height` 必须跟在`font-size`后面, 例如: `16px/3`

`font-variant` 只能使用 `normal` 和 `small-caps`

```
// 正确的书写顺序
font: font-style font-variant font-weight font-size/line-height font-family
```

## font-style

能够使用的就两个值

- `normal`
- `italic` 斜体

## font-variant

字体变体

- `normal`
- `small-caps` 小型大写, 对英文有效

常用的属性就是上面的两个, 但是还存在很多新的属性...

## font-weight

- `normal` 等同于 `400`
- `bold` 等同于 `700`
- `light` 等同于 `300`
- `bolder` 等同于 `900`
- `lighter` 等同于 `100`
- `100~900`

## font-stretch

字体拉伸 (使字体更加紧凑或者更加宽松)

- `normal`

**紧凑**

以下越来越紧凑
`semi-condensed` -> `condensed` -> `extra-condensed` -> `ultra-condensed`

**宽松**

以下越来越宽松
`semi-expanded` -> `expanded` -> `extra-expanded` -> `ultra-expanded`

## font-size & line-height

### font-size

**关键字**

`x-small` -> `small` -> `medium` -> `large` -> `x-large` -> `xx-large` -> `xxx-large`

其中:

`x-small` 对应 `12px`

`medium` 对应 `16px`

`large` 对应 `18px`

`x-large` -> `24px`

`xx-large` -> `32px`

`xxx-large` -> `48px`

**长度**

css 允许的数值, 例如 `14px` `2rem` 等

**百分比**

<mark style="color:tomato; font: bold 20px '';">&nbsp; 相对于父元素的字体大小 &nbsp;</mark>

### line-height

用于设置多行文本的间距. 对于块级元素, 它指定元素行盒的最小高度.

- `normal` 约为 `1.2`, 取决于字体

**数字**

计算方式: 元素字体大小 \* 数值大小

大多数情况下, 这是设置 `line-height` 的推荐方法

**长度**

例如 `px` `rem` 等

**百分比**

计算方法: 元素字体大小 \*　百分比

**一般来说, line-height 为 1.5 比较好**

## font-family

`font-family` 应该使用多个值, 且最后一个应该设置为通用的值. 以确保前面的字体无效的情况下能够比较正确的显示页面文字.

**通用取值**

- `serif` 衬线字体
- `sans-serif` 非衬线体
- `monospace` 等宽字体
- `cursive` 草书字体
- `fantasy` 艺术字体
- `fangsong` 介于宋体和楷体之间, 常用于政府文件
- `emoji` 专门用于 Emoji 表情字符的字体
- `math` 针对显示数学字符的特殊字体

## 其他

### font-kerning | chrome 33+

是否设置字体中存储的字距信息

- `normal` 设置
- `none` 关闭
- `auto` 浏览器自行判断

对于良好的规定了字距的字体, 字距特性使得字母分布更为统一, 阅读体验更佳

### font-synthesis

字体合成, 用于控制浏览器合成字体中缺失的 `粗体` `斜体` 和 `small-caps`

> 大多数标准西方字体包含斜体和粗体变体，但许多新颖（novelty）的字体不包括这些。用于中文、日文、韩文和其他语标文字（logographic script）的字体往往不含这些变体，同时，从默认字体中生成、合成这些变体可能会妨碍文本的易读性。在这些情况下，可能最好关闭浏览器默认的 font-synthesis 字体合成特性。

- `none`
- `weight`
- `style`
- `small-caps`

**语法**

```css
/* 允许同时指定多个需要合成的效果 */
font-synthesis: style weight;
```
