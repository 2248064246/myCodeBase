# WebAnimation

> 实验性功能

允许同步和定时更改网页呈现, 通过两个模型来实现: 时序模型 和 动画模型

## 介绍

允许使用 JS 来编写并控制动画

WebAnimation API 将浏览器动画引擎向开发者打开, 并由 JS 进行操作. 这些 API 被设计为 CSS Animation 和 CSS Transition 的接口, 未来会对这些接口做补充以丰富更多功能.

- 通过 Web 动画 API，我们可以将交互式动画从样式表移动到 JavaScript，将表现与行为分开。
- 不在需要依赖 DOM-heavy 技术(操作 DOM 的技术), 如将 CSS 属性和范围类写入元素来控制播放方向
- 与纯粹的声明式 CSS 不同，JavaScript 还允许我们动态地将属性值设置为持续时间

## 概念

### 关键帧

和 css animation 一样, js 动画也需要定义动画的关键帧.

**语法一**

```js
var keyFrames = [
  { opacity: 0, color: '#fff', easing: 'esse-out' },
  { opacity: 0.3, offset: 0.3, easing: 'ease-in' },
  { opacity: 1, color: '#000' },
];
```

> offset 是时间偏移量(类似 css 动画中的百分比)

> easing 指定当前帧到下一帧的过度动画效果(这个也可以在 AnimationEffectTimingProperties 对象中指定)

**语法二**

```js
var keyFrames = {
  opacity: [0, 1], // offset: 0, 1
  color: ['#fff', '#ddd', '#000'], // offset: 0, 0.5, 1
};
```

需要注意的是, 每个数组中的元素不需要相等, 提供的值会有独立的间隔.

同样也可以设置 offset 属性, 它会作用于对应的列

> 可以为任何`可以动画的css属性`(属性名称使用驼峰大小写指定)设置关键帧

### 关键帧效果

用于设置关键帧的动画效果, 持续时间, 延时, 方向, 动画次数等

```js
var options = {
  duration: 1000,
  delay: 1000,
  easing: 'linear', // ease, ease-in, ease-out, ease-in-out, cubic-bezier()
  iterations: Infinity, // 动画执行次数, 默认 1
  direction: 'alternate', // 动画方向: normal, reverse, alternate, alternate-reverse
  endDelay: 1000, // 动画结束后的延时, 主要用于排序动画序列
  composite: 'add', // 效果混合, add: 属性合并效果, accumulate: 属性值相加, replace: 替换
};
```

## 使用方法

### 直接通过 DOM 提供的 animate 方法

```js
var move = [
  {
    transform: 'translateX(0px)',
  },
  {
    transform: 'translateX(500px)',
  },
];
var moveTiming = {
  duration: 1500,
  iterations: Infinity,
  direction: 'alternate',
  easing: 'ease-in-out',
};

document.getElementById('box').animate(move, moveTiming);
```

### 使用 Animation API 控制

```js
const whiteRabbit = document.getElementById('box');

const rabbitDownKeyframes = new KeyframeEffect(
  whiteRabbit, // element to animate
  [
    {
      transform: 'translateX(0px)',
    }, // keyframe
    {
      transform: 'translateX(500px)',
    }, // keyframe
  ],
  {
    duration: 3000,
    iterations: Infinity,
    direction: 'alternate',
    // fill: 'forwards'
  } // keyframe options
);

const rabbitDownAnimation = new Animation(
  rabbitDownKeyframes,
  document.timeline
);

// Play rabbit animation
rabbitDownAnimation.play();
```

## 动画控制

DOM 的 `animate` 方法也会返回一个 `Animation` 对象实例

- cancel() 清除
- finish() 终止
- pause() 停止
- play() 开始
- reverse() 反转

### 事件处理程序

- oncancel
- onfinish

## 动画时间轴

> 目前感觉没有什么用处
