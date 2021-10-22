
# JS 标准内置对象

+ 值属性
+ 函数属性
+ 基本对象
+ 错误对象
+ 数字和日期对象
+ 字符串
+ 可索引的集合对象
+ 使用键的集合对象
+ 结构化数据
+ 控制抽象对象
+ 反射
+ 国际化
+ WebAssembly
+ 其他


## 值属性

这些全局属性返回一个简单值, 这些值没有自己的属性和方法

+ `Infinity`
+ `NaN`
+ `undefined`
+ `globalThis` (确定这玩意返回的是个简单值?? 这MDN有问题吧)

## 函数属性

全局函数可以直接调用, 不需要再调用的时候指定所属对象

+ `eval()`
+ `uneval()`
+ `isFinite()`
+ `isNaN()`
+ `parseFloat()`
+ `parseInit()`
+ `decodeURI()`
+ `encodeURI()`
+ `decodeURIComponent()`
+ `encodeURIComponent()`
  
已废弃的 `escape()` `unescape()`

## 基本对象

基本对象是定义或使用其他对象的基础, 基础对象包括一般对象, 函数对象, 和 错误对象

+ `Object`
+ `FUnction`
+ `Boolean`
+ `Symbol`


### 错误对象

错误对象是一种特殊的基本对象。它们拥有基本的 Error 类型，同时也有多种具体的错误类型

+ `Error`
+ `AggregateError`(处于草案阶段, 用于包含多个错误的错误集合)
+ `EvalError` eval 函数错误, **此异常不会再被JavaScript抛出**
  + EvalError 不在当前ECMAScript规范中使用，因此不会被运行时抛出. 但是对象本身仍然与规范的早期版本向后兼容.
+ `InternalError` **这个对象是非标准的**
  + 表示在 JS引擎内部出现错误
+ `RangeError` 
  + 表示 一个值不在其所允许的范围或者集合中
  + 当传递一个不合法的length值作为Array 构造器的参数创建数组，或者传递错误值到数值计算方法（Number.toExponential()，Number.toFixed() ，Number.toPrecision()），会出现RangeError。.
+ `ReferenceError`
  + 表示 当一个不存在的变量被引用时发生的错误。
  + 当你尝试引用一个未被定义的变量时，将会抛出一个 ReferenceError 。
+ `SyntaxError`
  + 当Javascript语言解析代码时,Javascript引擎发现了不符合语法规范的tokens或token顺序时抛出SyntaxError.
  + 比如使用关键字作为变量
+ `TypeError`
  + 表示值的类型非预期类型时发生的错误。
  + 当传入函数的操作数或参数的类型并非操作符或函数所预期的类型时，将抛出一个 TypeError 类型错误。
+ `URIerror`
  + 当向全局 URI 处理函数传递一个不合法的URI时，URIError 错误会被抛出。

## 数字和日期对象

+ `Number`
+ `BigInt`
+ `Math`
+ `Date`

## 字符串

用来表示和操作字符串的对象

+ `String`
+ `RegExp`

## 可索引的结合对象

这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。

+ `Array`
+ ...

## 使用键的结合对象

+ `Map`
+ `Set`
+ `WeakMap`
+ `WeakSet`

## 结构化数据

这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON （JavaScript Object Notation）编码的数据。

+ `ArrayBuffer`
+ `ShareArrayBuffer`
+ `Atomics`
  + Atomics 对象提供了一组静态方法对 SharedArrayBuffer 和  ArrayBuffer 对象进行原子操作。
+ `DataView`
+ `JSON`

## 控制抽象对象

+ `Promise`
+ `Generator`
+ `GeneratorFunction`
+ `AsyncFunction`

## 反射

+ `Reflect`
+ `Proxy`

## 国际化

ECMAScript核心的附加功能，用于支持多语言处理。

+ `Intl`

## WebAssembly

> 不知道这是啥玩意

## 其他

+ `arguments`
