# 单文件组件 `<script setup>`

`<script setup>` 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。

与普通 `script` 相比具有以下优点:

- 更少的样板内容, 更简洁的代码
- 能够使用纯 TypeScript
- 更好的运行时性能
- 更好的 IDE 类型推导

## 基本语法

## 顶层的绑定会被暴露给模板

当使用 `<script setup>` 的时候，任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，以及 import 导入的内容) 都能在模板中直接使用：

import 导入的内容也会以同样的方式暴露。

## 响应式

响应式状态需要明确使用响应式 API 来创建,ref 在模板中使用的时候会自动解包.

## 使用组件

`<script setup>` 范围里的值也能被直接作为自定义组件的标签名使用：

## 使用自定义指令

全局注册的自定义指令将正常工作。本地的自定义指令在 `<script setup>` 中不需要显式注册，但他们必须遵循 `vNameOfDirective` 这样的命名规范：

```html
<script setup>
  /* 这里命名有要求 */
  const vMyDirective = {
    beforeMount: (el) => {
      // 在元素上做些操作
    },
  };
</script>
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

## defineProps() 和 defineEmits()

## defineExpose()

## useSlots() 和 useAttrs()

## 顶层 await

`<script setup>` 中可以使用顶层 await。结果代码会被编译成 async setup()：

```html
<script setup>
  const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```
