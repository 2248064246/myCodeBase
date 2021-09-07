
# bind

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
function.bind(thisArg[, arg1[, arg2[, ...]]]) // 返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。
```

## bind 的一种作用是科里化函数

```js
function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var result1 = addArguments(1, 2); // 3

// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37);

var result2 = addThirtySeven(5);
// 37 + 5 = 42

var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 ，第二个参数被忽略
```

## 快捷调用

```js
var slice = Array.prototype.slice;

// ...

slice.apply(arguments);
```

```js
// 与前一段代码的 "slice" 效果相同
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);
```

## Polyfill

第一种
```js
if (!Function.prototype.bind) (function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0]; // 获取当前函数和参数
    var args = slice.call(arguments, 1); // 取出真正的函数参数, 第一个是需要bind的 this对象
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments)) // 这个argument是下面函数的...
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();
```

第二种
```js
//  Yes, it does work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) (function(){
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function(otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          baseArgs.push.apply(baseArgs, arguments);
          return fToBind.apply(
                 fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
          );
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
})();
```

## 非常重要的点

[来源](https://www.yuque.com/kuitos/gky7yw/yb4soq)

bind 返回的函数没有自己的 'prototype' 属性 
```js
function a () {}
let b = a.bind(null)
Object.prototype.hasOwnProperty.call(b , 'prototype') // false

```

```js
(() => {
  'use strict'; // 这个很重要, 在严格模式下, 这个会报错
  
  const boundFn = Function.prototype.bind.call(OfflineAudioContext, window); 
  console.log(boundFn.hasOwnProperty(boundFn, 'prototype'));
  boundFn.prototype = OfflineAudioContext.prototype; // 此时赋值的时候, boundFn 上没有 prototype, 会沿着原型链找, 然后原型链指向 BaseAudioContext, 严格模式下不允许赋值, 所以报错
  console.log(boundFn.hasOwnProperty(boundFn, 'prototype'));
})();
```