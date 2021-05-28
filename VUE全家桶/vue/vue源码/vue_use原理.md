

# Vue.use 原理

> 通过这个方法来注册 `vue组件`

[toc]

## 源码

```javaScript
import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 现获取注册过的插件数组
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 判断当前插件是否存在
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1) // 取出第一个元素之后的
    args.unshift(this) // 将vue 推入第一个元素
    // 插件要拥有 install 函数, 或者本身是个函数
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args) // 这里传入参数, 第一个是Vue, 所以在插件里面可以使用vue
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin) // 将初始化的插件推入插件数组
    return this
  }
}
```


## 插件
> 可以在这里将插件挂载到Vue全局对象上

vue-router 例子
```javaScript
import View from './components/view'
import Link from './components/link'

export let _Vue

export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  // vue-router 需要在Vue实例上挂载 router, 就是为了给Vue全局增加 `$router`
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  // 这里就有点让人头大了
  // 这里只是使用 vue 的 mergeHook 方法来创建钩子, 要调用钩子, 应该也需要通过 vue 调用
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}


```

iview例子

```javaScript
const install = function(Vue, opts = {}) {
    if (install.installed) return;
    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(iview).forEach(key => {
        Vue.component(key, iview[key]);
    });

    Vue.prototype.$IVIEW = {
        ...
    };

    Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Message = Message;
    Vue.prototype.$Modal = Modal;
    Vue.prototype.$Notice = Notice;
    Vue.prototype.$Spin = Spin;
};

```