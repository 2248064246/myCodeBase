/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-04-26 13:53:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-26 17:47:16
 * @Description: 
 */




class MyVue {
  constructor(options) {
    // TODO: Mixins extends
    this.$options = options
    this.$el = document.querySelector(options.el)

    this.$data = options.data()

    for (const key in this.$data) {
      // 将 $data 中的数据代理到 实例中 (第一层中的数据)
      proxy(this, '$data', key)
    }

    // 将数据响应式
    observe(this.$data)



  }
}

MyVue.prototype.$mount = function mountComponent() {

  this.$fragment = node2Fragment(this.$el)

  new Compiler(this.$fragment, this)

  this.$el.appendChild(this.$fragment)

}


class Compiler {
  constructor(el, vm) {
    this.$vm = vm
    this.compile(el)
  }

  compile(el) {
    const parent = el
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (node.nodeType === 1) {
        // 元素
        console.log('编译元素' + node.nodeName)
        // 编译元素
        // this.compileElement(node, parent)

      } else if (this.isInter(node)) {
        // 只关心 {{xxx}}
        console.log('编译插值表达式' + node.textContent)
        // 编译文本
        this.compileText(node)
      }

      // 递归子节点
      if (node.children && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }
  isInter(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  compileText(node) {
    console.log(RegExp.$1)
    // 表达式
    const exp = RegExp.$1
    this.update(node, exp, 'text')
    // node.textContent =  this.$vm[RegExp.$1]
  }

  update(node, exp, dir) {
    exp = exp.trim()
    const updator = this[dir + 'Updator']
    let expAry =  exp.split('.').entries()
    let val = this.$vm
    for(let [index, key] of expAry) {
      val = val[key]
    }


    updator && updator(node, val)
    new Watcher(this.$vm, exp, (value) => {
      updator && updator(node, value)
    })
  }

  textUpdator(node, value) {
    console.log('设置更新, complie', value, node)
    node.textContent = value
  }



}


function node2Fragment(el) {
  // 创建文档碎片, 这个片段的修改不会影响DOM
  const fragment = document.createDocumentFragment()

  let child;
  while (child = el.firstChild) {
    fragment.appendChild(child)
  }
  return fragment

}

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
}

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    // 这里 this 指向 target?
    console.log(this)
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

// 定义一个Observe(观察类, 用于初始化监听)
class Observe {
  constructor(value) {
    this.value = value
    // this.dep = new Dep()
    this.walk(value)
  }

  walk(value) { // 普通对象的监听
    if (!value || typeof value !== 'object') {
      return;
    }
    const keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(value, keys[i], value[keys[i]])
    }
  }
}

// 用于在对象上定义反应属性
function defineReactive(obj, key, val) {

  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  const getter = property.get
  const setter = property.set
  console.log('val', val)

  observe(val) // 如果value 是对象, 则调用 observe 进行深层次监听

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      // 为什么要使用原来自己的getter函数来拿值?
      const value = getter ? getter.call(obj) : val

      // 这个值是什么
      if (Dep.target) {
        dep.depend() // 
        // if (childOb) {
        //   childOb.dep.depend()
        // }
      }
      console.log('获取数据', value, val)
      return value
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val
      // 退出
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      if (getter && !setter) return // 只能获取的情况??
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      dep.notify() // 通知视图更新

    }
  })
}

// 
function observe(obj) {
  let ob = new Observe(obj)
  return ob
}

class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    const index = this.subs.indexOf(sub)
    this.subs.splice(index, 1)
  }
  depend() {
    if (Dep.target) {
      console.log('target', Dep.target, this)
      Dep.target.addDep(this)
    }
  }

  notify() {

    console.log('更新了')
    this.subs.forEach(dep => {
      console.log( 'dep',dep)
      dep.update()
    })
  }
}


Dep.target = null // 用来记录每次 new Watcher 时那个 实例是谁

const targetStack = []

function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}

function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}


class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.cb = cb
    this.key = key
    pushTarget(this)
    let expAry =  key.split('.').entries()
    let val = this.vm
    for(let [index, key] of expAry) {
      val = val[key]
    }
    this.value =  val
    popTarget()

  }

  addDep(dep) {
    dep.addSub(this)
  }

  update() {
    // 
    console.log('watcher 更新了')
    let expAry =  this.key.split('.').entries()
    let val = this.vm
    for(let [index, key] of expAry) {
      val = val[key]
    }
    this.value =  val
    this.cb(this.value)
  }
}