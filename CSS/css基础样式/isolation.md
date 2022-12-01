# isolation | chrome 47+

用于给指定元素创建新的栈上下文(也就是将当前元素和其他元素隔离)

隔离元素的属性无法影响到元素之外的属性

这对于`mix-blend-mode` 和 `z-index` 属性特别有用.

使用 `isolation`, 元素内部的 `mix-blend-mode` 将无法和外部元素背景产生效果.
