

## 区别

v-model 是双向绑定, 常用于表单组件

v-model的实现

```HTML

  <input type="test" value="userName" @input="userName=$event">

  v-model 有默认行为, 例如输入框是 value 值, 但是单选框是 checked

  <input type="radio" >

```