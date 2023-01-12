
# Object

## 静态方法

`assign(target, ...sources) => Object`
  + 只会拷贝源对象(source)自身的可枚举属性(包括 Symbol)到目标对象(并且只是浅克隆)
  + 不会拷贝属性描述, 只拷贝属性值

`create(prototype[, descriptor]) => Object`
  + 比较常见的是在继承中, 用于隔离子类和父类的原型
  + 使用指定的原型对象和属性创建一个新对象。
  ```js
  o2 = Object.create({p:'123'}, {
    p: {
      value: 42,
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
  // 这会创建一个拥有 {p: 42} 这个属性的对象
  // o2结构
  // p: 42
  //   prototype
  //      p: '123'
  //          prototype
  ``` 
  + 它还有另外一种用法-- 创建一个没有原型的对象
  ```js
    let a = Object.create(null)
    dir(a) // a 对象上没有原型
  ``` 

`defineProperty(obj, prop, descriptor)`
  + 给对象添加一个属性并制定该属性的配置(描述)
  + **会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性**，并返回此对象。
  + 上面这一点很重要, 如果有一个属性`x`是继承的, 通过此方法可以直接在当前对象上新加一个`x`属性, 原型链上的属性不会变化

`defineProperties(obj, props:{prop: descriptor})`
  + 给对象添加多个属性

`entries(obj) => Iterator`
  + 返回给定对象`自身可枚举属性`(不包括 Symbol)的`[key, value]`数组
  + 属性的顺序与通过手动循环对象的属性值所给出的顺序相同。
  + 与`for...in`不同的, `for...in`循环还会遍历原型上可枚举的属性(同样枚举 Symbol)

`freeze(obj) => Object`
  + 冻结对象: 对象不能增删改, 不能修改对象属性配置
  + 对象原型也不能被修改
  + 返回被冻结的对象

`getOwnPropertyDescriptor(obj, prop)`
  + 如果属性(**自身属性, 可以是Symbol**)存在对象上, 则返回对象属性描述, 否则返回 `undefined`
  
`getOwnPropertyNames(obj) => Array`
  + 返回一个由指定对象的所有**自身属性**的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组
  + 数组中枚举属性的顺序与`for...in`循环迭代时一致

`getOwnPropertySymbols(obj) => Array`
  + 返回一个给定对象自身的所有 Symbol 属性的数组

`getPrototypeOf(obj) => Object`
  + 返回指定对象的原型对象, 没有继承属性则返回 null

`is(value1, value2) => Boolean`
  + 判断两个值是否为同一个值
  + 满足一下条件两个值相等
    + 都是 undefined
    + 都是 null
    + 都是 true 或 false
    + 都是相同长度且相同字符相同顺序的字符串
    + 都是相同对象(同一个引用)
    + 都是数字且
      + 都是 +0
      + 都是 -0
      + 都是 NaN
      + 非0, 非NaN的同一个值
  + is() 方法不会进行类型转换, 且+0, -0 是不同的, 同时NaN==NaN
  > 与== (en-US) 运算不同。  == 运算符在判断相等前对两边的变量(如果它们不是同一类型) 进行强制转换 (这种行为的结果会将 "" == false 判断为 true), 而 Object.is不会强制转换两边的值。

  > 与=== (en-US) 运算也不相同。 === 运算符 (也包括 == 运算符) 将数字 -0 和 +0 视为相等 ，而将Number.NaN 与NaN视为不相等.

`isExtensible(obj) => Boolean`
  + 判断对象是否可扩展, 可扩展返回true

`isFrozen(obj) => Boolean`
  + 判断对象是否被冻结

`isSealed(obj) => Boolean`
  + 判断对象是否被密封

`keys(obj) => Array`
  + 回一个由一个给定对象的自身可枚举属性组成的数组(不包括 Symbol)
  + 数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致

`preventExtensions(obj)`
  + 让一个对象变的不可扩展(不可添加新属性)
  + 只阻止添加自身的属性, **对象原型依然可以添加新的属性**
  + 此方法会让原型原有属性不可写(也就是不能修改已有属性), 可以添加, 无法删除, 无法覆盖

`seal(obj)`
  + 密封一个对象, 阻止添加新属性, 不可配置(不可删除, 不可修改描述), 但是如果属性原来可写, 则依旧可写

`setPrototypeOf(obj, prototype)`
  + 给对象设置原型, 如果对象的原型(已有的)不可修改或不可扩展则会抛出错误
  + 相较于直接修改`__proto__`, 这是一个修改对象原型更合适的方法
  > 由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 `[[Prototype]]`在各个浏览器和 JavaScript 引擎上都是一个很慢的操作。 

  > 所以应该使用 Object.create() 来创建你想要的 `[[prototype]]`的新对象

  ```js
  /**
   * 给对象上增加 prototype(在对象的prototype上层增加其他的prototype)
   * @see MDN 的 Object.setPrototypeOf() 篇
   */
   Object.appendChain = function(oChain, oProto) {
    if (arguments.length < 2) {
      throw new TypeError('Object.appendChain - Not enough arguments');
    }
    if (typeof oProto !== 'object' && typeof oProto !== 'string') {
      throw new TypeError('second argument to Object.appendChain must be an object or a string');
    }

    var oNewProto = oProto,
        oReturn = o2nd = oLast = oChain instanceof this ? oChain : new oChain.constructor(oChain);

    for (var o1st = this.getPrototypeOf(o2nd);
      o1st !== Object.prototype && o1st !== Function.prototype;
      o1st = this.getPrototypeOf(o2nd)
    ) {
      o2nd = o1st;
    }

    if (oProto.constructor === String) {
      oNewProto = Function.prototype;
      oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
      this.setPrototypeOf(oReturn, oLast);
    }

    this.setPrototypeOf(o2nd, oNewProto);
    return oReturn;
  }
  ```

`values(obj) => Array`
  + 返回给定对象自身可枚举值的数组(不包括 Symbol)

## 原型属性

`constructor`

`__proto__`


## 原型方法

`hasOwnProperty(prop) => Boolean`
  + 返回一个Boolean, 表示对象自身上是否包含指定的属性(支持 Symbol)

`isPrototypeOf(object) => Boolean` 
  + 检查一个对象是否存在于另一个对象的原型上

`propertyIsEnumerable(prop) => Boolean`
  + 检测一个属性是否可枚举(是否可以被 for...in 枚举, 但是通过原型链继承的属性除外)

`toLocalString(参数同 lang 属性) => String` 
  + 将对象转为本地字符串

`toString() => String`
  + 返回一个表示该对象的字符串:  `[object type]`

`valueOf()`
  + 将对象转换为原始值。
  + 当遇到要预期的原始值的对象时，JavaScript会自动调用它。例如: 大小判断, 四则运算
  + 