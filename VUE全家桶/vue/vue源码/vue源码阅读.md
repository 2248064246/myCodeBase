
# vue 源码阅读

[TOC]

## 阅读源码的顺序

+ 从 `package.json` 文件找到配置文件入口
+ 在 `scripts/config.js` 入口找到 `web-full-dev`, 这个对应的就是 'vue.js'
+ 在 `scripts/alias.js` 找到 web 对应的别名 `src/platforms/web`
+ 找到 `src/platforms/web` 下的 `entry-runtime-width-compiler.js`
+ 这样 vue.js 的入口文件算是真正找到了

## 源码阅读

### `entry-runtime-width-compiler.js` 文件功能

+ 重写 `$mount`
  + `el` 不能是 `body` 和 `html`
  + 如果 `$options` 中存在 `render`, 会直接调用 `mount`
  + 如果没有
    + 会先判断 `template` 是否存在
      + `template` 可以是 `id选择器`, 可以是一个`DOM节点`
    + 没有再判断 `el` 是否存在
  + 最终 `template` 或者 `el` 都会边编译为 `functions`, 并返回给 `render` 属性, 然后调用 `mount` 方法
  + 问题
    + 传入 `template` 获取的是 `innerHtml`, 而 `el` 是 `outerHtml`
    + 在编译为 `functions`时还返回了一个 `staticRenderFns`, 这个是干嘛的
    + `hydrating | Boolean` 有什么作用
+ 初始化 `Vue.compile`

### `runtime/index.js` 文件

+ 定义 `$mount` 方法
  + 判断 `el && inBrowser ? query(el) : undefined`
  + 返回 `mountComponent(this, el, hydrating)`
    + 源自`core/instance/lifecycle`
+ 初始化平台特殊 utils
  + `Vue.config.mustUseProp`
  + `Vue.config.isReservedTag`
  + `vue.config.isReservedAttr`
  + `Vue.config.getTagNamespace`
  + `Vue.config.isUnknownElement`
+ 初始化 `Vue.options.directives` 和 `Vue.options.components`
  + 这两个不是参数吗??
+ 初始化 `Vue.prototype.__patch__` 方法

### `core/index` 文件

  + 定义 `全局API`
    + `Vue.config` 只允许读, 不允许写
      ```javaScript
        const configDef = {}
        configDef.get = () => config
        if (process.env.NODE_ENV !== 'production') {
          configDef.set = () => {
            warn(
              'Do not replace the Vue.config object, set individual fields instead.'
            )
          }
        }
        Object.defineProperty(Vue, 'config', configDef)
      ``` 
    +  `Vue.util`
      + warn
      + extend
      + mergeOptions
      + defineReactive  
    + `Vue.set`
    + `Vue.delete`
    + `Vue.nextTick`
    + `Vue.observable`
    +  `Vue.options`
      + 只会初始化一下属性
        + `components`
        + `directive`
        + `filter`
    + 定义 `use`, `mixin`, `extend`, `assetRegisters`
  + 定义 `Vue.prototype.$isServer` , `Vue.prototype.$ssrContent` 和 `Vue.FunctionalRenderContext`
  + 定义 `Vue.version`
  
### `instance/index`
> Vue 类在这里定义

```javaScript
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

+ `initMixin`, 这个是初始化 `Vue.prototype_init`
  + vm._uid 是累加的
  + 初始化 `vm.$options`
    + `mergeOptions(parentOptions, childOptions, vm)` 方法
      + options.extends 和 options.mixins 都会被 merge 到 options 中
      + 并且在这里将声明周期转为数组形式
        + 转为数组的原因是 `options`参数可以通过 `extends` `mixins` 混入, 可能出现多个声明周期的情况
  + `initLifecycle` 这个方法并不是初始化生命周期
    + 找到第一个非抽象父节点
      ```javaScript
        let parent = options.parent
        if (parent && !options.abstract) {
          while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent
          }
          parent.$children.push(vm)
        }
      ``` 
    + 初始化 `vm.$parent` `vm.$root` `vm.$children` `vm.$refs`
      + `$parent` 没有会是空
      + `$root` ==> `vm.$root = parent ? parent.$root : vm`
    + 定义控制 vm 的属性
      ```javaScript
          vm._watcher = null
          vm._inactive = null
          vm._directInactive = false
          vm._isMounted = false
          vm._isDestroyed = false
          vm._isBeingDestroyed = false
      ``` 
  + `initEvents`
    + `vm._events = Object.create(null)`
    + `vm._hasHookEvent = false` 
  + `initRender`
    + 定义
      + vm._vnode = null
      + vm._staticTrees = null
      + vm.$slots 
      + vm.scopedSlots
      + vm.$createElement = createElement(vm, a, b, c, d, true)
      + vm.$attrs
      + vm.$listeners
  + `callHook(vm, 'beforeCreate')`
    + 这个生命周期它是真么调用的???? 为什么代码里面 `vm.$options[hook]`会返回一个数组
      ```javaScript
        export function callHook (vm: Component, hook: string) {
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget()
        const handlers = vm.$options[hook]
        const info = `${hook} hook`
        if (handlers) {
          for (let i = 0, j = handlers.length; i < j; i++) {
            invokeWithErrorHandling(handlers[i], vm, null, vm, info)
          }
        }
        if (vm._hasHookEvent) {
          vm.$emit('hook:' + hook)
        }
        popTarget()
      } 
      ``` 
      + 
    + 在调用 `beforeCreate` 时候, 数据还没有初始化
    + 
  + `initInjections` 
    + 初始化 `inject`, inject的响应式是怎么做的...
  + `initState` 初始化 `data`, 监听
    + `initProps`
    + `initMethods`
    + `initData`
      + 如果 data 存在, 则 `initData`
      + 否则 `observe(vm._data = {}, true /* asRootData */)`
    + `initComputed`
    + `initWatch`
  + `initProvide` 初始化 `provide`
    + `vm._provided` 可以是一个`functions`
  + `callHook(vm, 'created')`
  + 然后如果`el`存在, 则调用 `vm.$mount(vm.$options.el)`

+ `stateMixin`
  + 设置属性
    + Vue.prototype.$data
    + Vue.prototype.$props
    + Vue.prototype.$set
    + Vue.prototype.$delete
    + Vue.prototype.$watch
      + 值可是 `Object`?
      + 是如何实现 属性监听的??
      + Watcher
+ `eventMixin`
  + 设置属性
    + Vue.prototype.$on
    + Vue.prototype.$once
    + Vue.prototype.$off
    + Vue.prototype.$emit
+ `lifecycleMixin`
  + 设置属性
    + Vue.prototype.$forceUpdate
    + Vue.prototype.$destroy
      + `destroy` 会调用 `beforeDestroy`
      + 会调用 `vm.$off()` 取消所有监听
+ `renderMixin`
  + 设置属性
    + Vue.prototype.$nextTick
    + Vue.prototype._render