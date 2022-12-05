# animation 相关

## animation

关键帧动画

animation 属性时 `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`, `animation-iteration-count`,`animation-direction`, `animation-fill-mode`,`animation-play-state` 属性的一个简写形式.

animation 属性的顺序要求:

- `name` 需要在第一位
- `duration` 在 `delay` 前面
- 其余属性没有特殊顺序要求
- 属性只能出现一次

## 动画定义

`@keyframes` 关键帧. 通过在动画序列中定义关键帧的样式来控制 css 动画序列的中间步骤

```css
@keyframes slidein {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
```

除了使用 `from` `to` 关键字, 还可以使用 百分比 进行精确控制

```css
@keyframes identifier {
  0% {
    top: 0;
    left: 0;
  }
  30% { 
    top: 50px;
  }
  68%,
  72% {
    left: 50px;
  }
  100% {
    top: 100px;
    left: 100%;
  }
}
```

> 注意: 关键帧中出现的 `!important` 将会被忽略

和 `transition` 相比, `@keyframes` 可以定义动画的中间步骤

## 缓动函数 animation-timing-function

> 这个同样适用于 transition

- `ease` 等同于 `cubic-bezier(0.25, 0.1, 0.25, 1.0)`

  在中间段加速, 在末尾减速

- `linear`
- `ease-in` 等同于 `cubic-bezier(0.42, 0, 1.0, 1.0)`

  开始慢, 慢慢加速直到结束

- `ease-out` 等同于 `cubic-bezier(0, 0, 0.58, 1.0)`

  开始快, 慢慢减速直到结束

- `ease-in-out` 等同于 `cubic-bezier(0.42, 0, 0.58, 1.0)`

  开始慢, 中间快, 结束慢

- `cubic-bezier()` 贝塞尔曲线

  https://cubic-bezier.com

- `steps(n, 开始位置)
  - n: 表示动画步数
  - 开始位置(以 n 为 5)
    - start: 20%, 40%, 60%, 80%, 100%
    - end: 0%, 20%, 40%, 60%, 80%
    - jump-both:
    - jump-none: 0%, 25%, 50%, 75% 100%

## 运动方向 animation-direction

- normal
- reverse: 反向开始
- alternate: 交替执行
- alternate-reverse: 反向交替执行

## 动画次数 animation-iteration-count

可以是数字(包括小数)

需要无限执行可以使用 `infinite` 表示

## 动画结束模式 animation-fill-mode

- none
- forwards: 动画执行完毕,元素保留最后动画结束的设置
- backwards: 动画会一开始就处于动画帧的开始的设置, 即使设置了动画延时
- both: forwards 和 backwards 的结合


## 动画状态 animation-play-state

通过这个属性可以设置动画的 运行和暂停

+ running
+ paused

例如在鼠标移入的设置为 `running` 让动画运行

