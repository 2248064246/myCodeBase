# transform

[toc|

## 操作

### skew 斜拉

### scale 缩放

### rotate 旋转

### translate 位移

## 原理

### transform: matrix(a, b, c, d, e, f)

> 无论是旋转还是拉伸, 本质上是应用 matrix( ) 方法实现的

```JavaScript
    // matrix 运算规则(2d)
    |a b c|     |x|    |ax + cy + e|
    |d e f|  *  |y| =  |bx + dy + f|
    |0 0 1|     |1|    |0  +  0 + 1|

    // e: 表示 translateX
    // f: 表示 translateY

    // a: scaleX
    // d: scaleY

    // b: skewY
    // c: skewX

    
```

### transform-origin

> 通过 transform-origin 属性进行设置的时候, 矩阵相关计算也随之发生改变, 实际图形效果上就是, 旋转拉伸的中心变了
