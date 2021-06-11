
# vue 指令 directives

## 如何自定义指令

```javaScript

<template>
  <h1 v-handle></h1>
</template>

export default {
  directives: {
    'handle': {
      bind (el, binding) {
        console.log('bind', el, binding)
        el.addEventListener('click', () => {
          el.style.color = 'red'
          console.log('click')
        })
      },
      inserted (el, binding) {
        console.log('inserted', el, binding)
      },
      update (el, binding) {
        console.log('update', el, binding)
      },
      componentUpdated (el, binding) {
        console.log('componentUpdated', el, binding)

      },
      unbind (el, binding) {
        console.log('unbind', el, binding)
      }
    }
  }
}
```

1. 进入此组件是, 会触发 `bind`, `inserted` 此时 `DOM` 已经挂载完毕的(mounted)
2. 组件数据有修改(组件更新了), 会触发 `update`, `componentUpdated`, 此时数据也是更新好的
3. 离开这个组件的时候会触发 `unbind`

### 参数说明

`el` 就是当前指令绑定的 `DOM` 元素

`binding` 是当前指令信息
  + value
  + oldValue
  + name
  + 这几个比较有用  


### 全局指令

```javaScript

  // 使用 Vue

  Vue.directive(name, obj)

```

### 作用

专门用来操作 `DOM`, 


1. 图片还未加载时使用随机颜色填充
   ```javascript
      Vue.directive('img', {
        inserted(el, binding) {
          let url = binding.value;

          // 设置随机背景
          el.style.color = 'xx'

          let img = new Image()
          img.src = url
          img.onload = () => {
            // 这里利用了图片缓存
            el.style.backgroundImage = `url(${url})`
          }
        }
      })
   ``` 

2. 鼠标移入元素, 显示tooltip功能

