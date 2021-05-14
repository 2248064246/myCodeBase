

## 水平居中方法 
> 注意分为行内元素和块级元素

```css
{
  display: flex;
  justify-content: center;
  align-items: center;
}
{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
{
  position: absolute;
  width: 100px;
  height: 100px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
{
  text-align: center;
  line-height: 盒子高度;
}
```

## css常用单位
> 注意各个单位的意义

+ rem
+ em
+ px
+ %
+ vh
+ vw
+ vmax
+ vmin
+ ...

## 画一条 0.5 px的线

```Css
  // 为什么不能直接用 0.5px
  width: 1px;
  transform: scale(0.5); 
```

## 盒子模型

+ 标准盒子模型 box-sizing: content-box
+ 怪异盒子模型(IE盒子模型) box-sizing: border-box
> 两者的区别在于 width 的计算

## 浮动特点
> 不会覆盖元素, 脱离文档流

## 浮动带来的影响
> 高度塌陷

## 清除浮动影响

+ 使用伪类 + clear: both
+ 父元素开启 BFC
+ 父级设置高度

## css 隐藏元素的方法

+ display: none;
  + 元素不在占据空间
+ opacity: 0;
  + 元素只是透明了, 但是元素依旧会响应用户交互事件
+ visibility: hidden;
  + 元素不可见, 并且不会响应交互事件

## css 三大特性

+ 继承
+ 层叠
+ 优先级

## 常见图片格式

+ png
  + 常见于拥有复杂透明的图片
+ jpg
  + 常用于图片, 色彩丰富
+ gif
  + 常用于动图, 支持色彩少, 支持简单透明
+ webp
  + 同等质量下, 大小比jpg小很多
+ apng
  + 支持动图的png

## 外边距合并及解决方法

+ 相邻元素的外边距合并
 + 相邻元素垂直外边距会合并(表现为某一个元素边距丢失)
    + 特点
      + 符号相同合并小的
      + 符号相反相加
    + 解决方法
      + 给下面的盒子设置`绝对定位`
      + 给下面盒子设置 `浮动`
      + 给下面盒子设置 `inline-block`
      + 感觉就是设置 `BFC`
+ 父子元素的外边距合并
 + 父子元素垂直外边距合并(表现为子元素的边距丢失, 父元素出现外边距)
    + 特点
      + 子元素的外边距会作用在父元素上并
      + 合并特定同`垂直外边距合并特点`
    + 解决方法
      + 父容器设置`border`, 不为0px, 用来隔开两个`margin`
      + 父容器设置 `overflow` 且不为 `none`
      + 父容器设置`padding`, 不为0px, 用来隔开两个`margin`
      + 父元素或者子元素设置 `浮动`
      + 父元素或者子元素设置 `绝对定位`
      + 子元素设置 `inline-block`
      + 感觉依旧可以使用`BFC`

## 怎么开启硬件加速

+ transform 属性
+ opacity 属性
+ filter 属性




