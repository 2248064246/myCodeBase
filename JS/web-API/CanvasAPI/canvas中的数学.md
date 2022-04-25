# canvas 中的数学

## 坐标系

canvas 中使用的是 W3C 坐标系(x 轴正方向向右, y 轴方向向下)

## 三角函数

canvas 中设计到角度使用的都是弧度.

`Math.sin(弧度)`
`Math.cos(弧度)`
`Math.tan(弧度)`
`Math.asin(sin值)` 得到对应弧度
`Math.acos()`
`Math.atan()`

### Math.atan() 与 Math.atan2()

这两个都可以用于计算两条边之间的夹角.(最常见的例子就是随鼠标旋转)

但是 Math.atan() 并不能准确知道具体的位置点(一三和二四象限点的正切值相同)

而`Math.atan2(y, x)` 可以准确表示对应的是哪个象限的角

> y: 对边长度(允许带方向); x: 临边长度(允许带方向)

```js
Math.atan2(1, 2); // 约为 26.56°
Math.atan2(-1, -2); // 约为 -153.43°
```

### 两点之间的距离

`Math.sqrt((x2 - x1)^2 + (y2 - y1)^2)`

### 圆周运动 和 椭圆运动

圆的标准方程 `x^2 + y^2 = R^2`

所以圆上任意一点 `x = R*cosɑ` `y = R*sinɑ`

所以可以得到, 在 canvas 中球上点的坐标为

```js
x = x1 + r * Math.cos(angle);
y = y1 + r * Math.sin(angle);
```

椭圆同理

### 波形运动

通过三角函数来实现周期变化

## 匀速直线运动

```js
x += vx;
y += vy;
```

沿着任意方向的匀速直线运动

> 需要使用速度分解, 分解到 x 方向和 y 方向

```
V合 = Math.sqrt(vx^2 + vy^2)`
```

```
vx = V合 * Math.cos(angle * Math.PI/180); angle是角度
vy = V合 * Math.sin(angle * Math.PI/180);
```

## 加速运动

加速运动，指的是方向相同、速度大小变化的运动

> 匀加速和匀减速运动

加速度: a = Δv/Δt

同样, 加速度可以分解为在 x 和 y 轴上的两个加速度

速度公式: `v = V0 + at`;

位移公式: `x = (v0 + Vt)/2*T = V0*t + 1/2aT^2 `
