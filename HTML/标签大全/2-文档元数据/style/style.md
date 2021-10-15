
# style 元素

+ 空元素
+ 双标签

## 属性

`type`

`media`
  + 该属性规定该样式适用于哪个媒体。

`scoped`
  + 此属性已经被淘汰, 但是可能会被重新引入
  + 此属性指定样式仅适用于其父项和子项的元素。
  + 但是已有相应的 [polyfill](https://github.com/samthor/scoped) 实现这个功能 

## 关于 scoped

```html
<div>
  <!-- style 中的css值会应用于这个div及其子元素 -->
  <style scoped></style>
</div>

```