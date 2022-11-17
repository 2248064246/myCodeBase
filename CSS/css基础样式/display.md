# display

`display` 属性设置元素是否被视为 `块或内联`元素以及`用于子元素的布局`

`display` 属性设置元素的内部和外部的`显示类型`

现在`display` 支持双值, 第一个指定外部表现,第二个指定内部表现;

---

**外部表现**

- block
- inline

<hr>

**内部表现**

- flow
- flow-root

  该元素生成一个块级元素盒，其会建立一个新的块级格式化上下文，定义格式化上下文的根元素。

- flex
- grid
- table

---

**预组合**

- inline-block

  等同于 `display: inline flow-root;`

- inline-flex

  等同于 `display: inline flex`

- inline-grid


