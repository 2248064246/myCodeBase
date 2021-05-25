

# anime.js 动画库

## 简介

> 是一个非常小 (6k) 的动画库

> 可以对 css属性, svg, dom和 javascript 对象进行动画

> 适合于 `2D` 动画

## 安装

> npm i -D animejs

## 使用

### 动画的目标对象

+ `targets`
  + 可以是 `css` 选择器
  + 可以是 `dom` 元素 | 元素序列
  + 可以是 `javascript 对象`
  + 可以是一个 `css`选择器, `dom` 的数组

###  可动画的属性
> 大多数 `css` 属性都会导致布局更改或重新绘制, 并会导致动画不稳定. 尽可能考虑优先使用 `opacity` 和 `transforms`

+ 可以对绝大部分带单位的 `css` 设置动画
+ 可以对单独的 `transform` 属性设置动画
  + translateX
  + translateY
  + ...

### 动画基础参数

+ `duration` 动画持续时间, 单位 `ms`
+ `delay` 动画延时, 单位 `ms`
+ `endDelay` 末端延时, 单位 `ms`
  + 在动画结束时以毫秒为单位添加一些额外时间
  + 这个只对 `往返` `循环`动画有效果, 在回去的时候, 会等待一段时间
+ `easing` 时间曲线 [时间曲线](#时间曲线)
+ `round` 数字格式, 将会向上舍入为 x小数, 默认 0
  + round == 1, 整数
+ 特殊属性
  + 动画效果的属性可以是个对象, 通过可以控制每个样式的效果
  ```javaScript
    rotate: {
      value: 360,
      duration: 1800,
      easing: 'easeInOutSine'
    }
  ```
  + 内部动画可以继承外部的动画属性
+ 可一个给 控制动画时间的参数设置函数, 为动画的每个目标和属性设置不同的值
  ```javaScript
    anime({
      targets: '.function-based-params-demo .el',
      translateX: 270,
      direction: 'alternate',
      loop: true,
      delay: function(el, i, l) {
        return i * 100;
      },
      endDelay: function(el, i, l) {
        return (l - i) * 100;
      }
    });
  ```

### 方向和循环

+ `direction` 方向
  + normal
  + reverse
  + alternate 往返
+ `loop` 循环
  + Number, 指定循环次数
  + true 无限循环
+ `autoplay` 自动播放
  + true
  + false
  
### 动画赋值方式

+ 无单位数值
  + 没有写单位, 会根据css属性的补充默认值
+ 有单位数值
  + 可以自己指定单位, 例如: `rem`, `%`
+ 相对数值(允许写 运算符)
  + `+=100`
  + `-=100`
  + `*=100`
  + 为什么没有 `/=`...
+ 颜色
  + 接受 16进制, rgb|a, hsl|a
+ 设置动画初始值 `[from, to]`
  + `translateX: [100, 250], // from 100 to 250` translateX: [100, 250], // from 100 to 250
+ **函数返回值**
  + target 当前动画的目标
  + index 当前元素的索引
  + targetsLength 动画目标总数

### `keyframes` 关键帧

+ 动画关键帧
  > 如果关键帧内没有指定duration（持续时间），则每个关键帧的持续时间将等于动画总持续时间除以关键帧数。 
  ```javaScript
    anime({
      targets: '.animation-keyframes-demo .el',
      keyframes: [
        {translateY: -40},
        {translateX: 250},
        {translateY: 40},
        {translateX: 0},
        {translateY: 0}
      ],
      duration: 4000,
      easing: 'easeOutElastic(1, .8)',
      loop: true
    });
  ``` 
+ 属性关键帧
  > 如果关键帧内没有指定duration（持续时间），则每个关键帧的持续时间将等于动画总持续时间除以关键帧数。
  ```javaScript
    {
      translateX: [
        {value: 100, easing: 'easeOutExpo'},
        {value: 200, delay: 500},
        {value: 300, duration: 1000}
      ]
    }
  ```
### 时间曲线

+ 匀速 
  + linear
+ 不匀速
  | IN(渐快)    | OUT(渐慢)   | IN-OUT(两头慢, 中间快) | 效果                   |
  | ----------- | ----------- | ---------------------- | ---------------------- |
  | ...Sine     | ...Sine     | ...Sine                |
  | easeInQuad  | easeOutQuad | easeInOutQuad          |
  | easeInCubic | ...Cubic    | ...Cubic               |
  | ...Quart    | ...Quart    | ...Quart               |
  | ...Quint    | ...Quaint   | ...Quaint              | 以上到此, 效果逐渐增强 |
  | ...Expo     | ...Expo     | ...Expo                | 突然减速, 效果较强     |
  | ...Circ     | ...Circ     | ...Circ                | 突然减速, 效果较弱     |
  | ...Back     | ...Back     | ...Back                | 冲出终点后返回         |
+ 三次赛贝尔曲线
  + 可以使用自定义的 [三次赛贝尔曲线](https://cubic-bezier.com/#.17,.67,.83,.67)
+ 弹簧 (spring)
  > 效果是末尾会弹来弹去 
  + `spring(Mass, Stiffness, Damping, Velocity)`
  + Mass 质量, 默认 1
  + Stiffness 刚度 (弄不明白), 默认 100
  + Damping 阻尼, 默认 10
  + Velocity 初始速度, 默认 0
+ 弹跳
  > 效果是动画开始会有弹来弹去效果
  + `easeIN|Out|InOutElastic(amplitude, period)`
  + amplitude 振幅, 默认 1, 控制曲线的过冲
  + period 周期, 默认 0.5, 控制曲线来回的次数
+ 台阶式 (步动画)
  + `step(number)`
+ [自定义](https://www.animejs.cn/documentation/#customEasing)
  + 自定义函数方法, 返回动画当前时间函数
  ```javaScript
  easing: function(el, i, total) {
    return function(t) {
      return Math.pow(Math.sin(t * (i + 1)), total); // 
    }
  }
  ``` 