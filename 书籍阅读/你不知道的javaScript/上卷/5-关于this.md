 # 关于this

 ## 判断this

 1. 函数是否在 `new` 中调用, 是的话 `this` 就是新创建的对象 `var bar = new XXX() // this 是bar`
 2. 函数是否通过 `call`, `apply`, `bind` 绑定`this`
 3. 函数是否在某个上下文对象中调用
 4. 默认调用函数, 非严格模式下`this` 是`window`, 严格模式下是`undefined`
 5. 自执行函数中, this永远是`window`
 6. 箭头函数中, this沿着作用域向上查找