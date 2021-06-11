
# vue 动画

## transition 组件

### 单个组件

```vue
<template>
  <div id="app"
       class="app">
    <div style="margin-left:30px; ">
      <Button @click="open = !open">点击</Button>

      <transition name="simple"
                  @before-enter="handler('before-enter')"
                  @before-leave="handler('before-leave')"
                  @before-appear="handler('before-appear')"
                  @enter="handler('enter')"
                  @appear="handler('appear')"
                  @leave="handler('leave')"
                  @after-enter="handler('after-enter')"
                  @after-appear="handler('after-appear')"
                  @after-leave="handler('after-leave')">       
        <p v-if="open">hello</p>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      open: true
    }
  },
  methods: {
    handler(type) {
      console.log(type)
      // after-enter 需要等待过渡完成完成才会调用
    }
  }
}
</script>
<style>
.simple-enter {
  background: tomato;
}
.simple-enter-active {
  background: cyan;
  transition: all 2s;
}
.simple-enter-to {
  background: black;
}
.simple-leave {
  background: red;
}
.simple-leave-active {
  background: green;
}
.simple-leave-to {
  background: blue;
}
</style>
```

### 回调顺序
在首次进入的时候打印顺序, 需要 `v-if` 为 `true`

> 这个叫做初始渲染过渡
1. before-appear(el)
2. appear(el, done)
3. after-appear(el) 

以上只在进入且**显示**的时候触发, 首次进入时不会触发 `enter 类`

DOM 隐藏时 `v-if=false`

1. before-leave(el)
2. leave(el, done) // 回调函数 done 是可选的
3. after-leave(el)


DOM 显示时 `v-if` 为 true

1. before-enter(el)
2. enter(el, done) // 回调函数 done 是可选的
3. after-enter(el)

+ 特别说明: after-enter, after-leave 需要等待 `enter-active` 中的过渡完成后才会被调用

> 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。

### 动画类执行顺序

> 需要给 `transition` 指定 `name` 命名空间

显示的时候
1. `name-enter` 类
   + 定义元素进入(显示在页面)开始的样式
   + 在这里写过渡, 动画没有效果
2. `name-enter-active` 类
   + **定义元素过渡, 动画效果** , 只能在这里定义过渡, 动画
   + 在这里也可以定义元素的样式
3. `name-enter-to` 类 
   + 定义元素进入的效果, 在过渡完成之后会被移除, 然后回归原始样式


隐藏的时候
1. `name-leave`
2. `name-leave-active`
3. `name-leave-to`

## 多个组件过渡

### 使用 `v-if` 和 `v-else`

```javaScript
  <div class="btn">
    <transition name="btn">
        <Button v-if="change" key="on">开启</Button>
        <Button v-else key="off">关闭</Button>
    </transition>
  </div>

  <style>
    .btn-enter, .btn-leave-to {
      opacity: 0;
    }
    .btn-enter-active, .btn-leave-active {
      transition: all 1s;
    }
  </style>

```
上面有个问题, 效果不够好看

> 在“on”按钮和“off”按钮的过渡中，两个按钮都被重绘了，一个离开过渡的时候另一个开始进入过渡。这是 <transition> 的默认行为 - 进入和离开同时发生。

优化

1. 使用 transform 实现滑动效果
  ```javascript
    .btn {
      position: relative;
    }
    .btn button {
      position: absolute;
    }

    .btn-enter {
      opacity: 0;
      transform: translateX(60px);
    }
    .btn-leave-to {
      opacity: 0;
      transform: translateX(-60px);
    }
    .btn-enter-active,
    .btn-leave-active {
      transition: all 1s;
    }
  ```

2. 使用 `mode` 属性设置过渡模式

