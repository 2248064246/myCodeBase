# will-change

向浏览器提示元素应该如何更改. 浏览器可能会在设置对应的优化.

> `will-change` 旨在用作最后的手段来处理现有的性能问题. 它不应该用于预测性能问题

```css
/* Keyword values */
will-change: auto;
will-change: scroll-position;
will-change: contents;
will-change: transform; /* Example of <custom-ident> */
will-change: opacity; /* Example of <custom-ident> */
will-change: left, top; /* Example of two <animatable-feature> */
```
