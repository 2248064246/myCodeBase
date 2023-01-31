# flex 布局

flexible box 模型(弹性盒子模型), 是一种一维布局模型-- 一次只能处理一个维度上的元素布局, 一行或者一列.

## flexbox 的两根轴线

flex 布局有两根轴线-- 主轴和交叉轴.

主轴由`flex-direction` 定义, 交叉轴垂直于主轴

## 起始线和终止线

其实就是用 起始/终止 来描述左右.

如果是从左到右排列, 则主轴的起始线在左边, 终止线在右边.

## flex 容器

默认情况下, 把一个元素设置为 flexbox, 该元素的直系子元素都会变为 flex 元素. 所有 css 都会有一个初始值, 默认有以下行为:

- 元素排列为一行(默认 `flex-direction` 为 row)
- 元素从主轴的起始线开始
- 元素不会在主维度方向拉伸, 但是可以缩小.
- 元素被拉伸来填充交叉轴大小
- flex-basis 为 auto
- flex-wrap 为 nowrap

## flex 元素上的属性

- `flex-grow`
- `flex-shrink`
- `flex-basis`

**flex-basis**
定义了该元素的空间大小, 如果设置了 width, 则 flex-basis 的值就是 width 大小. 如果没有设置, 则 flex-basis 会是元素内容的大小

**flex-grow**
flex-grow 属性可以按比例分配空间。如果第一个元素 flex-grow 值为 2，其他元素值为 1，则第一个元素将占有 2/4

上面这三个属性可以通过`flex`属性进行简写. `flex: flex-grow flex-shrink flex-basis`

## 控制对齐的属性

- `justify-content` 控制主轴上所有元素的对齐
- `align-items` 控制交叉轴上所有元素的对齐
- `align-self` 控制交叉轴上单个元素的对齐
- `align-content` 控制主轴的项目在交叉轴的对齐

## 元素间的对齐和空间分配

Flexbox 的一个关键特性是能够设置 flex 元素沿主轴方向和交叉轴方向的对齐方式，以及它们之间的空间分配。

**align-items**
此属性可以使元素在交叉轴方向对齐.

默认值为`stretch`, 这就是为什么默认情况下 flex 元素会默认拉伸到最高元素的高度

- `stretch`
- `center`
- `flex-start` flex 容器顶部对齐
- `flex-end` flex 容器底部对齐

**justify-content**
此属性用来使主轴方向上的元素对齐. 初始值是`flex-start`

- `flex-start`
- `flex-end`
- `center`
- `stretch`
- `space-around`
- `space-between`
- `space-evenly`

**align-self**
此属性用于控制单个 flex 元素在交叉轴上的对齐

- `stretch`
- `center`
- `flex-start`
- `flex-end`

**align-content**
此属性用于控制换行的 flex 容器控制多行主轴元素在交叉轴上的对齐(控制每行之间的空间分配)

- `flex-start`
- `flex-end`
- `center`
- `stretch`
- `space-around`
- `space-between`
- `space-evenly`

## 弹性框额其他布局方法的影响

如果一个元素是浮动的, 然后它的父项成为弹性容器, 此时会发生什么?

答案是: 浮动将不会再影响弹性容器的子元素.

## flex 和 grid

弹性框是一种一维布局方法，而网格布局是一种二维布局方法.

在网格布局中，您可以在容器上执行大部分大小调整规范，设置轨道，然后将项目放入其中。在 flexbox 中，当您创建 flex 容器并在该级别设置方向时，对项目大小的任何控制都需要在项目本身上进行。

## 使用自动的外边距在主轴上对齐

```html
<style>
  .box {
    display: flex;
  }
  .push {
    margin-left: auto;
  }
</style>

<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div class="push">Four</div>
  <div>Five</div>
</div>
```

效果是 One Two Three 在左边, Four, Five 在右边, `margin-left: auto` 会自动填充flex容器的剩余空间


