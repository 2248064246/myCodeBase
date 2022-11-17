# content-visibility | chrome 86+

内容可见性属性, 它能够控制元素是否需要被渲染. 效果和`display`类似, 但是比`display` 更加优秀. 能够起到加快首页渲染的效果.

- `visible`: 默认
- `hidden`: 隐藏元素, 元素将从页面中移除, 类似`display:none`
- `auto`: 在元素和用户无关时(元素不在视口中), 会跳过渲染元素内容, 但是和 `hidden` 不同的是, 此时依然可以通过页面搜索查找此元素内容, 依旧可以被聚焦被选中.

使用 `conetnt-visibility: auto` 来加速渲染元素, 处于屏幕外的元素只是样式不会被渲染, 它依旧处于 DOM 树中
