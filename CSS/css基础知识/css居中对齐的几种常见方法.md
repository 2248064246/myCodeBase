
# CSS--几种常用的水平垂直居中对齐方法
[Toc]

## 文字的水平垂直居中
```CSS
    text-align: center;
    line-height: 单前元素高度;
```

## 元素的水平垂直居中

1. 使用绝对定位
```CSS
   /* 需要固定宽高 */
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    width: xxx;
    height: xxx
    margin: auto;
```

2. 使用绝对定位+ calc()
```CSS
    /* 需要知道具体的元素宽高值 */
    position: absolute;
    width: xxx;
    height: xxx;
    top: calc(50% - xxx/2);
    left: calc(50% - xxx/2)
```
3. 使用绝对定位+transform
```CSS
   /* 不需要知道元素的宽高 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
```
4. 使用display:flex;
```CSS
    display: flex;
    justify-content: center;
    align-items: center;
```