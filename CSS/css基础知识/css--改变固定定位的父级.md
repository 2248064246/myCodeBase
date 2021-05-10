# css--改变固定定位(fixed)的父级定位元素

> 固定定位并不是只能相对 `body` 定位, 它的父级定位元素是可以自己设置的

[toc]

### MDN 原文

<b>fixed</b>
<span>The element is removed from the normal document flow, and no space is created for the element in the page layout. It is positioned relative to the initial containing block established by the viewport, except when one of its ancestors has a `transform`, `perspective`, or `filter` property set to something other than none (see the [CSS Transforms Spec](https://www.w3.org/TR/css-transforms-1/#propdef-transform)), in which case that ancestor behaves as the containing block. (Note that there are browser inconsistencies with `perspective` and `filter` contributing to containing block formation.) Its final position is determined by the values of top, right, bottom, and left.
</span>

**就是说如果父级设置了`transform`,`perspective`,`filter`且不为`none`,那么它的子孙元素就会相对于这个父级进行固定定位**

### 效果示例

#### 代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      .father {
        width: 400px;
        height: 400px;

        /* 设置transform */
        /* transform: translateX(10px); */

        /* 设置perspective */
        perspective: 100px;

        /* 设置 filter */
        /* filter: grayscale(100); */

        background: cyan;
      }

      .child {
        width: 200px;
        height: 200px;
        background: darkgoldenrod;
      }

      .grand-child {
        /* 孙子元素开启 固定定位 */
        position: fixed;
        /* 定位于底部 */
        bottom: 0;
        width: 100px;
        height: 100px;
        background: darkgreen;
      }
    </style>
  </head>
  <body>
    <div class="father">
      <div class="child">
        <div class="grand-child"></div>
      </div>
    </div>
  </body>
</html>
```

#### 效果

![效果图](https://i.loli.net/2020/05/25/I4pVSQEbe67rRqJ.png)
**可以看到孙子元素设置了 `fixed` 定位, 但是时相对于 *`father`* 元素定位而不是 *`body`*** 
