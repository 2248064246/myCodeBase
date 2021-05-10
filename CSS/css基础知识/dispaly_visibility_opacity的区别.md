# CSS3--3种隐藏元素方法的区别

[Toc]

## display: none

1. `DOM`结构: 浏览器不会渲染`display:none` 的元素, 并且不占据页面空间
2. 事件监听: 无法对元素进行事件监听
3. 继承: 不会被子元素继承(子元素设置`display: block` 不会显示)
4. 改动: 改动属性值会引起页面的**重排**和**重绘**
5. 过渡: 无法设置过渡效果 `transition: display`无效

## visibility: hidden

1. 不会被渲染,但是会占据页面空间
2. 无法对元素设置事件监听
3. 可以继承,子元素设置非`visibility:hidden`可以显示
4. 改动属性只会引起页面重排
5. `transition:visibility`会立即显示, `hidden有过渡效果`

## opacity: 0
1. 元素被隐藏, 会占据页面空间
2. 可以设置事件监听
3. 可以继承, `子元素设置opacity可以显示`
4. 不会重绘也不会重排
5. `transition`: `opacity` 可以实现显示隐藏的过渡效果
6. `opacity` 会触发**硬件加速**
