# scroll 相关

## scroll-behavior

控制滚动条的滚动行为.

- `auto`
- `smooth` 在导航或者通过 api 因此滚动时, 能够平滑过渡(也就是由个动画效果, 而不是突变)

## scroll-margin

滚动边距, 语法与 `margin` 一致, 表现也差不多.

滚动之后会多余出 `scroll-margin` 的部分.

如果只有 `vertical` 滚动条, 则只有 `top, botttom` 起效果.

## scroll-padding

效果和 `scroll-margin` 差不多

## scroll-snap-stop | chrome 75+

它的效果时在滚动时, 如果滚动元素超过自身一般, 或滚动之后立即到达下一个元素.

- `normal` 只有超过滚动容器一半才会滚动到下一个元素, 否则滚回当前元素
- `awayls` 稍微滚动以下, 就会滚动到下一个元素

## scroll-snap-algin | chrome 75+

自动滚动时的对其标准(这个能够控制滚动位置)

- `start` 以元素的开始位置(如果时水平, 则时左边. 垂直滚动则是上边)
- `end` 以元素的结束位置
- `center` 以元素的中间位置

## scroll-snap-type

设置在滚动容器上强制实施对齐点的严格程度

- `none`
- `mandatory` 强制对其元素的边框 (就是移动滚动条, 滚动条一定会自己滚动到指定 `align` 位置)
- `proximity` 可以随意拖动滚动条位置, 滚动条不会严格对其

**语法**

```css
/* 可以单独设置某一个方向的对齐程度 */
scroll-snap-type: x mandatory;

scroll-snap-type: x proximity;
```

## 修改滚动条样式

不推荐修改(不同浏览器的滚动条规格不太一样, 一帮来说, 保持原样为好)

```css

目前我们可以通过 CSS伪类 来实现滚动条的样式修改，以下为修改滚动条样式用到的CSS伪类：

::-webkit-scrollbar — 整个滚动条
::-webkit-scrollbar-button — 滚动条上的按钮 (上下箭头)
::-webkit-scrollbar-thumb — 滚动条上的滚动滑块
::-webkit-scrollbar-track — 滚动条轨道
::-webkit-scrollbar-track-piece — 滚动条没有滑块的轨道部分
::-webkit-scrollbar-corner — 当同时有垂直滚动条和水平滚动条时交汇的部分
::-webkit-resizer — 某些元素的corner部分的部分样式(例:textarea的可拖动按钮)

```
