# flex

[toc]

## flex 布局的基本概念

flex 是一种一维的布局模型(一次只能处理一个维度上的元素布局), 它给 flexbox 的子元素之间提供了强大的空间分布和对其能力.

## flexbox 的两根轴线

主轴 和 垂直于主轴的交叉轴. 主轴由 `flex-direction` 定义

- row (默认)
- row-reverse
- column
- column-reverse

## 起始线和终止线

就是指以前的从左到右还是从右到左.

flex 中使用 起始线和终止线来表示, 元素从 start -> end 排列

## flex 容器

`display: flex` 会将容器中直系子元素变成 flex 元素. 会有以下初始值:

- 元素排列一行(row)
- 元素从主轴的起始线开始
- 元素不会在主维度方向拉伸, 但是可以缩小
- 元素被拉伸来填充交叉轴大小 (待定?)
- flex-basis: auto
- flex-wrap: nowrap

## 用 flex-wrap 实现多行 flex 容器

在使用 `flex-wrap: wrap` 实现换行的时候, 要注意应该把每一行看作一个新的 flex 容器

## 简写属性 flex-flow

是 `flex-direction`(第一个) 和 `flex-warp`(第二个) 的组合简写

## 简写属性 flex

是 `flex-grow` `flex-shrink` `flex-basis` 的简写

```css
/* 一个值, 无单位数字: flex-grow */
flex: 2;

/* 一个值, width/height: flex-basis */
flex: 10em;
flex: 30px;
flex: min-content;

/* 两个值: flex-grow | flex-basis */
flex: 1 30px;

/* 两个值: flex-grow | flex-shrink */
flex: 2 2;

/* 三个值: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```

- 一个无单位值: 它会作为 flex-grow, flex-shrink 会设为默认 1, flex-basis 默认 0;
- 双值: 第一个值必须是无单位值, 第二个可以是无单位值或者一个有效的宽度值.
- 三值:


