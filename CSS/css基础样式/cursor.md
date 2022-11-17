# cursor

设置光标类型

**语法**

```css
cursor: none;

cursor: pointer;

/* 指定图片作为光标, 后面必须要接一个关键字, 防止图片无法获取时无法显示光标 */
cursor: url("xxx"), auto;
```

可以指定多个 `url`, 浏览器会获取第一个可用的图片作为光标.

通过, 使用`url` 还可以提供`x,y` 坐标, 它们用来设置自定义图标的实际点击位置. (位置相对于图标的左上角)

```css
cursor: url(one.svg), url(two.svg) 5 5, progress;
```


[cursor 指针大全](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)