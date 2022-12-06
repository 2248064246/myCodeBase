# @container

可以理解为应用于单个容器（元素）的媒体查询。

通过`container-name`属性给容器加上标识, 然后通过 `@contaienr containerName <container-condition>` 来指定需要的容器的触发条件.

**语法**

```
@container name <container-condition> {
  <stylesheet>
}
```

- `name` 容器名称
- `<container-condition>`：针对查询容器评估的一组功能。当容器改变大小时评估条件，`<stylesheet>`如果条件为真则应用定义的样式。
- `<stylesheet>`: 一组 CSS 声明。

```css
.box {
  container-name: 'box';
}

@container box (width > 400px) {
  font-size: 24px;
}
```

**容器逻辑关键字**

- `and`
- `or`
- `not`

```css
@container not (width < 400px) {
  /* <stylesheet> */
}

@container (width > 400px) and (height > 400px) {
  /* <stylesheet> */
}

@container (width > 400px) or (height > 400px) {
  /* <stylesheet> */
}

@container (width > 400px) and (width > 800px) or (orientation: portrait) {
  /* <stylesheet> */
}
```
