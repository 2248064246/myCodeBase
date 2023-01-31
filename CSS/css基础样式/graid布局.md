# grid 布局

## grid 布局基本概念

grid 是一组相交的水平线和垂直线, 它定义了网格的列和行.我们可以将网格元素放置在这些行和列相关的位置上. css 网格布局具有以下特点:

- **固定的位置和弹性的轨道大小**
- **精确的元素定位**
- **对齐控制**
- **控制重叠内容**

## grid 容器

使用 `display: grid` 将一个元素设置为 grid 容器, 其直接子元素会立即变为 grid 元素.

## grid 轨道

通过 `grid-template-rows` 和 `grid-template-columns` 来定义行和列.

网格的轨道式是两个轴线之间的空间.

## fr 单位

可以使用任何长度单位定义轨道. 除此之外, grid 还引入了 fr 来灵活创建网格轨道.

**fr 表示 grid 容器剩余可用空间的一个等分**

## 混合 fr 和绝对尺寸

```css
.wrapper {
  display: grid;
  grid-template-columns: 500px 1fr 2fr;
}
```

上面 css 中, 第一个轨道为 500 像素，因此 500 固定宽度从可用空间中移除。剩余的空间分为三个，并按比例分配两条灵活的轨道。

## repeat() 方法

可以使用 repeat() 方法来定义重复的轨道

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 等同 */
  /* grid-template-columns: 1fr 1fr 1fr; */
}
```

## 隐式和显式网格

## 轨道大小和最大最小值

在设置显式网格或为自动创建的行或列定义大小时，我们可能希望为轨道提供最小大小，但也要确保它们扩展以适应添加的任何内容。例如，我可能希望我的行永远不会折叠小于 100 像素，但是如果我的内容拉伸到 300 像素的高度，那么我希望行拉伸到该高度。

网格提供了`minmax()` 函数来解决这个问题.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
```

## 网格线

应该注意的是，当我们定义网格时，我们定义网格轨道，而不是线。然后，网格为我们提供了编号线，以便在定位项目时使用。在我们的三列两行网格中，我们有四列线, 3 行线.

### 靠线定位项目

`grid-column`
`grid-column-start`
`grid-column-end`

`grid-row`
`grid-row-start`
`grid-row-end`

`grid-area` 这个属性等同于 `grid-row-start` `grid-column-start` `grid-row-end` `grid-column-end`

```css
.box1 {
  grid-area: 1 / 1 / 4 / 2;
}
.box2 {
  grid-area: 1 / 3 / 3 / 4;
}
```

默认情况下, 行和列默认跨域一个轨道, 所有可以不写`end`

## 网格单元

## 网格区域

grid 元素可以按行或列跨越一个或者多个单元格, 网格区域必须是矩形.

## 间距

`row-gap`
`column-gap`
`gap`

## 使用 z-index 控制重叠

网格项可以占用同一个单元格, 在这种情况下可以通过`z-index`属性来控制重叠项的堆叠顺序

## 网格和绝对定位

grid 元素可以使用绝对定位, 绝对定位的计算起始点是单前 grid 元素所处于的网格线区域.

例如: 如果一个 grid 元素 row 位于 1 到 3, column 位于 2 到 4, 则绝对定位的计算起始是 {row: 1, column: 2} 的位置.

## 基于网格线的定位

### 反向计数

`grid-row` `grid-column` 可以使用负数, 这回从后面开始计数.

### 使元素跨越整个网格

```css
.item {
  grid-column: 1 / -1;
}
```

### 使用 `span` 关键字

可以通过 span 关键字来定义元素跨越多少个轨道

```css
.box1 {
  grid-column: 1;
  grid-row: 1 / span 3;
}
```

## 元素对齐

这个和 flex 的主轴为 row 时的属性一致, 参数也是一致

`align-items`
`justify-content`
`align-self`
`align-content`

除此之外:
`justify-self`aa
`justify-items` 


