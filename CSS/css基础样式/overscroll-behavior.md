# overscroll-behavior | chrome 63+

用于控制浏览器的 `滚动链` 的行为

浏览器中的`滚动链` -- 子元素滚动到底部, 可以继续带动父元素滚动.

这个行为浏览器是默认开启的.

- `auto`
- `contain` 滚动链行为只在元素内部
- `none` 禁止滚动链行为

> 特别注意: iframe 并不是滚动容器, 因此无法使用 `overscroll-behavior` 属性

**包含属性**

- `overscroll-behavior-x`
- `overscroll-behavior-y`


