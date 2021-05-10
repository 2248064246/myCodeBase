+ 防止拖拽文本域(textarea)
    + style="resize: none"
+ cursor
    + default 默认,小箭头
    + pointer 小手
    + move 移动
    + text 文本
    + not-allowed 禁止
+ vertical-align 垂直对齐
    + **只对行内/行内块元素有效**
    + 一个文字有四条线对齐线
        + 顶线 top line
        + 中线 middle line
        + 基线 base line
        + 底线 bottom line
    + 对应 vertical-align 的四种对齐方式
    + 主要用于图片 和 文字的对齐
    + 去除图片底部的空白缝隙
        + 默认基线对齐,改成 top,bottom,middle
        + 或者把图片改为块级元素, 块级元素对vertical-align无效

+ white-space
    + 设置或检索对象内文本的显示方式,通常用于**强制一行显示**
    + 属性
        + normal
        + nowrap
            + 强制在一行显示所有文本(除非遇到 br)
+ text-overflow 文字溢出裁减模式
    + clip 默认,直接裁减,不加效果
    + ellipsis 省略号

+ **得到文字溢出省略号效果**
    + 先 white-space: nowrap
    + 再 overflow: hidden
    + 最后 text-over-flow: ellipsis

+ css 精灵技术

+ css 滑动门
    + 背景图片会随着文字的多少而自动拉伸(效果不会变)
    ```html
    <style>
        a{
            /* 设置为行内块, 宽度将由内容撑开 */
            display: inline-block;
            height: xxx;
            background:url(./..) no-repeat;
        }
        a span{
            display: inline-block;
            height: 33px;
            /* 这里url要和a 相同,并且是 右对齐 */
            background: url(./..) no-repeat right;
            
        }
    </style>
    <body>
        <a >
            <span></span>
        </a>

    </body>
    ```

+ css负值之美
    + margin: -1px
        + 用来在浮动的时候重叠相邻元素的边框
        + 浮动元素会默认挨着相邻的元素, 设置margin: -1px 内消除相邻边框
    + 通过使用position: relative
        + 可以实现被压住的边框在次显示
        + 显示层级
            + 普通流 --> 浮动 --> 定位