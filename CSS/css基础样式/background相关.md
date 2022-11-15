# bakcground 相关

## background

这是一个简写属性, 它由 `background-image` `background-color` `background-size` `background-position` `background-origin` `background-clip` `background-attachment` 组成

可以值写其中一个属性, 也可以写多个

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


