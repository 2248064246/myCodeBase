# bakcground 相关

## background

这是一个简写属性, 它由 `background-image` `background-color` `background-size` `background-position` `background-origin` `background-clip` `background-attachment` 组成

可以值写其中一个属性, 也可以写多个

## background-color

## background-image

可以同时指定多个图片

在绘制时, 图像以 `z` 轴方向堆叠方式进行.

先指定的图像会在之后的图像上面绘制, 因此指定的第一个图像`最接近用户`

元素的`border`会在图像之上被绘制, 而`background-color` 会在图像之下绘制.

如果过一个指定的图像无法被绘制(url 加载错误), 将会等同于 `none`

> 即使图像是不透明的，背景色在通常情况下并不会被显示，web 开发者仍然应该指定 background-color 属性。如果图像无法被加载—例如，在网络连接断开的情况下—背景色就会被绘制。

## background-size

- 任意 css 支持的数值
- cover: 保留图像比例的情况下尽可能覆盖容器。容器大于图片会放大以填充满容器
- contain:　在不剪切或拉伸图像的情况下，尽可能缩放图像以填充容器．容器大于图片将会导致图片平铺（复制）
- auto

**语法**

```css
/* width: 50%, height: 100% */
background-size: 50% 100%;

background-size: cover;

/* 设置多张图片的大小 */
background-size: cover, container;
```

## background-origin

控制背景的显示区域

- border-box: 背景图片的摆放以 border 区域为参考; border+padding+content 区域显示背景
- padding-box: 背景图片的摆放以 padding 区域为参考; padding+content 区域显示
- content-box: 背景图片的摆放以 content 区域为参考; 只在内容区域显示

## background-position

控制背景图片的相对位置

`background-position-x` `background-position-y` 的简写

**语法:**

```css
/* Keyword values */
background-position: top;
background-position: bottom;
background-position: left;
background-position: right;
background-position: center;

/* <percentage> values */
background-position: 25% 75%;

/* <length> values */
background-position: 0 0;
background-position: 1cm 2cm;
background-position: 10ch 8em;

/* Edge offsets values */
background-position: bottom 10px right 20px;
background-position: right 3em bottom 10px;
background-position: bottom 10px right;
background-position: top right 10px;
```

## background-clip

- border-box
- padding-box
- content-box
- text

`border-box` `padding-box` `content-box` 和 `background-origin` 效果是一样的

`text` 可以将背景应用于文字, **需要文字颜色为透明**

## background-attachment

用于控制背景图片的位置是在`视口`内固定还是随着包含它的区块滚动

- fixed: 背景相对于视口固定
- scroll: 背景相对于元素本身固定
- local: 背景会随着内容滚动而滚动(相对于元素内容固定)

## 其他相关属性

### background-repeat

有两个值, 第一个定义在 x 轴的重复行为, 第二定义在 y 轴的重复行为

- `repeat`: 图像会按需来覆盖整个背景图片所在的区域. 图像可能会被裁剪, 如果大小不合适.
- `space`: 图像会尽可能覆盖, 但是不会裁剪. 但是不会裁剪。第一个和最后一个图像会被固定在元素 (element) 的相应的边上，同时空白会均匀地分布在图像之间。background-position 属性会被忽视，除非只有一个图像能被无裁剪地显示。只在一种情况下裁剪会发生，那就是图像太大了以至于没有足够的空间来完整显示一个图像。
- `round`: 完全覆盖图像所在区域, 图像可能会被拉伸
- `no-repeat`

### background-blend-mode | chrome 35+

属性定义该元素的背景图片，以及背景色如何混合。

可以定义多个值, 对应多个背景图片.

属性具体参数查看 `blend-mode`
