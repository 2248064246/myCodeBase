# 使用JS实现动画

## 动画间隔
> 一般屏幕为60HZ, 1秒刷新60次

> 1000 / 60 ~= 16.67 ms

## 优化
> 上面的动画需要使用 setInterval 来实现, 这种性能远不及CSS动画

[MDN参考链接](https://developer.mozilla.org/zh-CN/docs/Web/Performance/CSS_JavaScript_animation_performance)
+ 使用 `requestAnimationFrame()`
  + 在绘制下一帧之前由浏览器调用其中的回调函数
+ 性能对比  VS CSS动画
  + 在大多数时候, 和CSS动画几乎一致
  + 在重绘事件发生之前, css动画在主线程仅仅是重新采集元素的样式, 这和通过 `requestAnimationFrame` 回调重新计算元素样式是一样的, 也是在下一次重绘之前触发, 假如二者都是在 UI线程创建动画, 那么它们之间没有性能差异
+ **脱离主线程**动画
  + 只要动画涉及的属性不引起 reflow(重新布局), 可以把操作移出主线程. 最常见的方式是 css transform. 如果一个元素被提升为一个 layer, transform 属性动画就可以在GPU中进行. 这将会有更好的性能
    + MDN 的这个解释可能有点问题, 基本上绝大部分动画属性都需要 reflow, 但是开启GPU加速是非常好的
    + 一个重要的理解是 `创建一个层`也就是将`动画元素隔离到自己的GPU层上`, GPU主要计算这一个层就可以了
    ```javaScript
      // 设置具有3D特征（例如translate3d()或matrix3d()）的变换会触发浏览器为该元素创建一个GPU层
    ````
    + 并非所有CSS属性都能在CSS动画中获得GPU增强。 transform 和 opacity 是主要的受益者
  + 将计算移出主线程
    + 这个并不是很管用
    + 如果某个特定动画期间98％的工作是图形渲染和文档布局，而2％正在计算新的位置/旋转/不透明度/任何值，即使您将它们计算的速度提高了10倍，您只会看到整体速度提高1％左右。

## css 动画的局限性

+ 无法设置复杂动画
+ 无法设置基于物理的运动
+ 动画滚动位置
+ ...

## 几个优秀的动画库

+ GSAP 
+ anime