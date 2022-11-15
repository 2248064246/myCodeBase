# accent-color | chrome 93+

用于控制`多选框|单选框|范围选择器`选中后的样式

```html
<input type="checkbox" checked />
<input type="checkbox" class="custom" checked />
```

```css
input {
  accent-color: auto;
  display: block;
  width: 30px;
  height: 30px;
}

input.custom {
  /* 选中后会变成红色 */
  accent-color: tomato;
}
```
