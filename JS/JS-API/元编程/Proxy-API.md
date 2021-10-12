
# Proxy 代理

```js
/* target 是被代理的原始对象, handler 是捕捉器(处理器对象) */
const p = new Proxy(target, handler)
```

**注意, 处理器对象中的所有方法都是 Reflect 中定义的方法(同名, 同操作)**

对于所有的基础操作, 代理对象会在处理器对象上查找类似的方法, 如果存在这个方法, 代理对象就调用它, 如果不存在这个方法, 代理对象就在目标对象上执行基础操作

这意味着代理可以从处理器对象获得自己的行为 (就是通过处理器, 在增删改查是进行自定义处理)

## 示例

```js
let t = { x: 1}
let p = new Proxy(t, {}) // 处理器对象为空
p.x // 1
delete p.x 
t.x  // undefined, 同时从目标对象上删除了 
```


```js
let identity = new Proxy({}, {
  get(o, name) {
    return name
  },
  has(o, name) {
    return true;
  },
  set(o, name, value) {
    return false // 不允许设置属性值
  },
  deleteProperty(o, name) {
    /* 在这里可以使用 Reflect.deleteProperty 来执行删除操作 */
    return false // 不允许删除
  },
  defineProperty(o, name, desc) {
    return false // 不允许定义新属性
  },
  isExtensible(o) {
    return false // 返回不可扩展
  },
  setPrototypeOf(o) {
    return false // 无法修改原型
  },
  ownKeys(o) {
    throw new RangeError('参数过多')
  }
})

identity.x // x
identity.toString // toString
identity.x = 1 // 设置不会成功

delete identity.x // false

Object.keys(identity) // 无法通过 ownKeys 获取属性

for(let k in identity){} // 同样报错

Object.defineProperty(identity, 'name', {value: 'tom'}) // 不允许定义新属性
```

代理对象可以从目标对象和处理器对象获得他们的行为(最是操作代理对象和目标对象的行为不一样)
```js
function readOnlyProxy(o) {
  function readOnly() { throw new TypeError('ReadOnly')}
  return new Proxy(o, {
    set: readOnly,
    defineProperty: readOnly,
    deleteProperty: readOnly,
    setPrototypeOf: readOnly,
  })
}
let o = {x: 1} 
let p = readOnlyProxy(o)
o.y = 2 // 目标对象是可写的

p.x = 2 // 代理对象不可写
delete p.y // 代理对象不可删除
p.z = 3 // 失败, 代理对象不可新增
```

上面这个示例在测试的时候有用, 例如需要传入一个对象, 但是并不希望这个函数去修改对象内容, 就可以这么用


另外一种用法是定义处理器方法, 拦截对象操作, 但仍然把操作委托为目标对象(通过反射API)

```js
function loggingProxy(o, objName) {
  const handler = {
    get(o, name, receiver) {
      console.log(`Handler get(${objName}, ${name.toString()})`)
      let value = Reflect.get(o, name, receiver)
      // 如果属性是目标的自由属性, 而且值为对象或函数, 则返回这个值的代理
      if(Reflect.ownKeys(o).includes(name) && 
      (typeof value == 'object' || typeof value == 'function')) {
        return loggingProxy(value, `${objName}.${name.toString()}`)
      }
      // 否则原封不动返回值
      return value
    },
    set(o, name, value, receiver) {
      console.log(`Handler set(${objName}, ${name.toString()}, ${value})`)
      return Reflect.set(o, name, value, receiver)
    },
    apply(target, thisArgs, args) {
      console.log(`Handler ${objName}(${JSON.stringify(args)})`)
      return Reflect.apply(target, thisArgs, args)
    },
    construct(target, argsList, newTarget) {
      console.log(`Handler construct(${target}, ${argsList})`)
      return Reflect.construct(target, argsList, newTarget)
    }
  }

  /* 可以通过反射API直接生成, 应为属性名字是对应的 */
  Reflect.ownKeys(Reflect).forEach(handlerName => {
    if(!(handlerName in handler)) {
      handler[handlerName] = function(target, ...args) {
        console.log(`Handler ${handlerName}(${objName}, ${args})`)
        return Reflect[handlerName](target, ...args)
      }
    }
  })

  return new Proxy(o, handler)
}

// 这个方法可以让我看到所有API方法处理数据的过程
let data = [10, 20]
let methods = {square(x) { return x*x} }

let proxyData = loggingProxy(data, 'data')
let proxyMethods = loggingProxy(methods, 'methods')

/* 这里可以看到 map 方法执行过程 */
proxyData.map(methods.square)

/* 这里可以看到 square 方法执行的过程 */
data.map(proxyMethods.square) 

/* 这里可以看到迭代过程 */
for(let x of proxyData) console.log('data', x)

```

