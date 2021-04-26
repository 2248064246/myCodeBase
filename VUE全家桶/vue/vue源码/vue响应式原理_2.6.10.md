
# Vue 响应式原理

> 如何得值数据的变动?


> 在数据变动后如何重新渲染页面


+ `Dep` 类
  + dep.depend()
    + 将当前 Dep.target 推入 dep 实例的 subs 属性
  + dep.notify()
    + 获取 subs的值, 并调用上面的 update 属性
  + dep.addSub()
  + dep.removeSub()
  + Dep.target
    + 这个是保存的是 'Watcher' 实例
+ `Watch` 类
+ `Observer` 类
  + 参数 value, dep, vmCount
    + vmCount ?? 这个是干嘛的
      + 官方解释是: number of vms that have this object as root $data 
    + dep 是 new Dep 类...
    + def() 方法??
    + 如果是数组调用 this.observeArray() 方法
      + 循环数组, 调用 observe(item[i])
    + 否则使用  this.walk()
      + 循环对象中的 key, 调用 defineReactive(obj, key)
+ defineReactive 方法
  + 参数 obj, key, val, customSetter shallow
    + obj: 一般是vm对象
    + key: 是 vm 上的属性
    + val: 是一个对象??
    + customSetter: 自定义的 setter 方法
    + shallow: 是否 浅层次监听(一层)
  + 不可扩展对象不会监听 (对象描述 configurable === false)
  + shallow 为false, 会对进行 observe(val), 监听 val对象里面的数据
+ observe 方法
  + 如果对象存在 '__ob__' , 则返回这个
  + 没有判断
    + 'shouldObserve' 为真 (是否允许 Observe)
    + 非无服务器渲染
    + 是数组或者 plain(简单)对象
    + 是可扩展对象 (Object.isExtensible)
    + 非 Vue 对象 (value._isVue)
+ pushTarget
  + 将 Watcher 实例赋值给 Dep.target
+ popTarget
  + 推出 Watcher 实例
```javaScript
Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

```
