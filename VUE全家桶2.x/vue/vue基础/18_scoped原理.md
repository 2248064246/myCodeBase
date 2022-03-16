# scoped

原理是在编译的时候 l, 给样式加上 属性选择器, 在 DOM 中加上类似 `data-v-hash` 这样的属性

这样达到样式值应用于当前组件

但是要注意 scoped 的作用域，因为权重的问题，如果是在子组件使用了 scoped，那么在父组件中是不能直接修改子组件的样式的，需要在父组件中使用 vue 的深度作用选择器。

[博客](https://www.cnblogs.com/CyLee/p/10006065.html)
