# canvas 基本

Canvas API 提供了一个通过 JavaScript 和 HTML 的`<canvas>`元素来绘制图形的方式。它可以用于**动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面**。

Canvas API 主要聚焦于 2D 图形。而同样使用`<canvas>`元素的 WebGL API 则用于绘制硬件加速的 2D 和 3D 图形。

Canvas 的默认大小为 300 像素 ×150 像素（宽 × 高，像素的单位是 px）。但是，可以使用 HTML 的高度和宽度属性来自定义 Canvas 的尺寸。

该元素可以使用 CSS 来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果 CSS 的尺寸与初始画布的比例不一致，它会出现扭曲。

`<canvas>`元素可以像任何一个普通的图像一样（有 margin，border，background 等等属性）被设计。然而，这些样式不会影响在 canvas 中的实际图像, 当开始时没有为 canvas 规定样式规则，其将会完全透明。

canvas 元素默认被网格所覆盖。通常来说网格中的一个单元相当于 canvas 元素中的一像素。**栅格的起点为左上角（坐标为（0,0））**。所有元素的位置都相对于原点定位。

## 替换内容

在不支持`canvas`上的浏览器如何显示替换内容?

```js
<canvas id="stockGraph" width="150" height="150">
  current stock price: $3.15 +0.15
</canvas>

<canvas id="clock" width="150" height="150">
  <img src="images/clock.png" width="150" height="150" alt=""/>
</canvas>
```

如果浏览器支持, 则会忽略 canvas 里面的内容, 如果不支持, 则会忽略 canvas 容器, 显示里面的元素;

`</canvas>` 标签不可省与 `<img>` 元素不同，`<canvas>` 元素需要结束标签(`</canvas>`)。如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

如果不需要替代内容，一个简单的 `<canvas id="foo" ...></canvas>` 在所有支持 canvas 的浏览器中都是完全兼容的。

## 渲染上下文

- 2d
- webgl
- webgl2
- bitmaprenderer 这将创建一个只提供将 canvas 内容替换为指定 ImageBitmap 功能的 ImageBitmapRenderingContext

### 检查支持性

```js
var canvas = document.getElementById('tutorial');

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```
