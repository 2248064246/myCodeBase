# 交叉点观察器 API

> https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API

Intersection Observer API 提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。

过去，要检测一个元素是否可见或者两个元素是否相交并不容易，很多解决办法不可靠或性能很差。然而，随着互联网的发展，这种需求却与日俱增，比如，下面这些情况都需要用到相交检测：

- 图片懒加载——当图片滚动到可见时才进行加载
- 内容无限滚动——也就是用户滚动到接近内容底部时直接加载更多，而无需用户操作翻页，给用户一种网页可以无限滚动的错觉
- 检测广告的曝光情况——为了计算广告收益，需要知道广告元素的曝光情况
- 在用户看见某个区域时执行任务或播放动画

## 概念和用法

Intersection Observer API 允许你配置一个回调函数，当以下情况发生时会被调用

- 每当目标（target）元素与设备视窗或者其他指定元素发生交集的时候执行。设备视窗或者其他元素我们称它为根元素或根（root）。
- Observer 第一次监听目标元素的时候

通常，您需要关注文档最接近的可滚动祖先元素的交集更改，如果元素不是可滚动元素的后代，则默认为设备视窗。如果要观察相对于根（root）元素的交集，请指定根（root）元素为。null

无论您是使用视口还是其他元素作为根，API 都以相同的方式工作，只要目标元素的可见性发生变化，就会执行您提供的回调函数，以便它与所需的交叉点交叉。

目标（target）元素与根（root）元素之间的交叉度是交叉比（intersection ratio）。这是目标（target）元素相对于根（root）的交集百分比的表示，它的取值在 0.0 和 1.0 之间

### 创建一个交集观察者

```js
let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);
```

参数说明

- root 指定根元素, 用于检查目标的可见性, 必须是目标元素的父级元素, 如果未指定或为 null 则是浏览器窗口
- rootMargin 根元素的外边距, 类似 css margin,该属性值是用作 root 元素和 target 发生交集时候的计算交集的区域范围，使用该属性可以控制 root 元素每一边的收缩或者扩张。默认值为 0
- threshold 可以是单一 number 也可以是 number 数组, target 元素和 root 元素相交程度达到该值的时候 IntersectionObserver 注册的回调函数将会被执行, 默认 0.
  - 如果你只是想要探测当 target 元素的在 root 元素中的可见性超过 50%的时候，你可以指定该属性值为 0.5。
  - 如果你想要 target 元素在 root 元素的可见程度每多 25%就执行一次回调，那么你可以指定一个数组 。默认值是 0 （意味着只要有一个 target 像素出现在 root 元素中，回调函数将会被执行）。该值为 1.0 含义是当 target 完全出现在 root 元素中时候 回调才会被执行。[0, 0.25, 0.5, 0.75, 1]

### 定位要观察的元素

```js
let target = document.querySelector('#listItem');
observer.observe(target);
```

只要目标满足为 IntersectionObserver 指定的阈值，就会调用回调。

```js
let callback = (entries, observer) => {
  entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed target element:
    // entry.boundingClientRect 目标元素的边界信息
    // entry.intersectionRatio  返回intersectionRect 与 boundingClientRect 的比例值.
    // entry.intersectionRect 返回一个 DOMRectReadOnly 用来描述根和目标元素的相交区域.
    // entry.isIntersecting 返回true: 交叉, false: 分离
    // entry.rootBounds 返回 root
    // entry.target 与根出现相交区域改变的元素 (Element).
    // entry.time 返回一个记录从 IntersectionObserver 的时间原点(time origin)到交叉被触发的时间的时间戳
  });
};
```
> 请留意，你注册的回调函数将会在主线程中被执行。所以该函数执行速度要尽可能的快。如果有一些耗时的操作需要执行，建议使用Window.requestIdleCallback（）方法。


## 停止监听

+ observer.disconnect() 停止整体对象的监听
+ observer.unobserver(target) 停止对特定目标监听