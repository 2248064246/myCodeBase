

## 区别

v-model 是双向绑定, 常用于表单组件

v-model的实现

```HTML

  <input type="test" value="userName" @input="userName=$event">

  v-model 有默认行为, 例如输入框是 value 值, 但是单选框是 checked

  <input type="radio" >

```

## .sync
> .sync 用于非form组件的数据双向绑定

```HTML
 <xx :value.sync="title"></xx>

 this.$emit('update:value', newValue) // 需要在组件内部显示触发事件才能更新值
```

