# TypeScript

## 	一. ts的介绍安装与开发工具

### 	1-1 ts介绍

- TypeScript是由微软开发的一款开源的编程语言。

- TypeScript是Javascript的超集，遵循最新的ES6/ES5规范。TypeScript扩展了Javascript的语法。

- TypeScript更像后端Java、C#这样的面向对象的语言，可以让js开发大型项目。

- 谷歌也在大力支持TypeScript的推广，谷歌的angular2.x+就是基于TS语法。

- TypeScript 设计目标是开发大型应用，它可以编译成纯 JavaScript，编译出来的 JavaScript 可以运行在任何浏览器上

- TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

- TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。



### 特点

1.**兼容性** TS 可以编译出纯净, 简介的JS代码, 并可以运行在浏览器, Node.js和任何支持ECMAScript 的JavaScript引擎中
2. **强大的类型系统**, 允许开发编译器进行静态类型检测
3. **先进的JavaScript**

### 	 2-2  ts的安装 

​		

```
cnpm  i  typescript -g

tsc  hello.ts

（tsc ./src/hello.ts --outFile ./dist/hello.js）
```



###      2-3 vscode 的配置

​	1. tsc --init  生成tsconfig.json 配置文件，然后修改outDir:"./dist"

​	2. 终端-运行任务-监视tsconfig.json

```
"outDir": "./dist",         
"rootDir": "./src",         
```



## 二. ts的数据类型

​	typescript中为了使编写的代码更加规范，更有利于维护，增加了类型校验，在ts中主要给我们提供了如下数据类型：

​	

```
布尔类型
数字类型
字符串类型
数组类型
元组类型
枚举类型
任意类型
null和undefined
void类型
never类型 (永远不会有返回值的情况，例如死循环、抛出异常的情况)
```



### 2-1数据类型-基础：

​	TypeScript包含的最简单的数据单元有：数字，字符串，布尔值，Null 和 Undefined等。TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。常见的有布尔值、数字、字符串、数组、元组、枚举、any 和 void 等



#### 布尔值

​	最基本的数据类型就是简单的`true/false`值，在JavaScript和TypeScript里叫做`boolean`

```
let isDone: boolean = false
```



#### 数字

​	和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是`number`。

```
let decLiteral: number = 6
```



#### 字符串

​	TypeScript像其它语言里一样，使用`string`表示文本数据类型。 和JavaScript一样，可以使用双引号（"）或单引号（'）表示字符串。

```
let from: string = "千锋教育"
from = "好程序员"
```

​    也使用模版字符串，定义多行文本和内嵌表达式。 这种字符串是被反引号包围（`），并且以${ expr }这种形式嵌入表达式。

```
let surname: string = `Felix`
let age: number = 37
let sentence: string = `Hello, my name is ${ surname }.

I'll be ${ age + 1 } years old next month.`
```



#### 数组

​	TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```
let list: number[] = [1, 2, 3]
```

第二种方式是使用数组泛型，Array<元素类型>：

```
let list: Array<number> = [1, 2, 3]
```



#### 元组

​	元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。

```
// 声明一个元组类型 x
let x: [string, number]
// 初始化 x
x = ['hello', 10] // OK
// 无效的初始值
x = [10, 'hello'] // Error
```



当访问一个已知索引的元素，会得到正确的类型：

```
console.log(x[0].substr(1)) // OK
console.log(x[1].substr(1)) // Error, 'number' 不存在 'substr' 方法
```

当访问一个越界的元素，会出现错误：

```
x[3] = "world" // Error, '[string, number]' 未定义第 3 个元素的类型.
console.log(x[5].toString()) // Error, '[string, number]' 未定义第 5 个元素的类型.
```



#### 枚举

​	enum类型是对JavaScript标准数据类型的一个补充。 使用枚举类型可以为一组数值赋予友好的名字。

```
enum Color {Red, Green, Blue}
let c: Color = Color.Green
```

默认情况下，从 0 开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1 开始编号：

```
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green
```

或者，全部都采用手动赋值：

```
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

```
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]
console.log(colorName)  // 'Green'
```



#### any

​	有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用`any`类型来标记这些变量：

```
let notSure: any = 4
notSure = "maybe a string instead" // OK 赋值了一个字符串
notSure = false // OK 赋值了一个布尔值
```

在对现有代码进行改写的时候，`any` 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。

```
let notSure: any = 4
notSure.ifItExists() // okay, ifItExists函数在运行时可能存在
notSure.toFixed() // okay, toFixed 函数存在 (在编译时不做检查)
```

当你只知道一部分数据的类型时，`any` 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```
let list: any[] = [1, true, "free"]
list[1] = 100
```



#### void

​	某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```
function echo(): void {
  console.log('做真实的自己，用良心做教育')
}
```



### 2-2数据类型-高级

#### 类型推断

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

#### 什么是类型推断

以下代码虽然没有指定类型，但是会在编译的时候报错：

```
let lunarDay = '初一'
lunarDay = 1
// Type '1' is not assignable to type 'string'.
```

事实上，它等价于：

```
let lunarDay: string = '初一'
lunarDay = 1
```

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

let myFavoriteNumber 

myFavoriteNumber = 'seven' 

myFavoriteNumber = 7



let someValue: any = "this is a string"

let strLength: number = (someValue).length 

另一个为as语法：

let someValue: any = "this is a string"

let strLength: number = (someValue as string).length

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好



#### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

##### 简单的例子

```
let lunarDay:string | number
lunarDay = '初一'
lunarDay = 1
```

联合类型使用 | 分隔每个类型。

这里的`let lunarDay: string | number`的含义是，允许 lunarDay 的类型是 string 或者 number，但是不能是其他类型。



#### 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

```
function getLength(something: string | number): number {
  return something.length
}
// Property 'length' does not exist on type 'string | number'.
// Property 'length' does not exist on type 'number'.
```



上例中，length 不是 string 和 number 的共有属性，所以会报错。 访问 string 和 number 的共有属性是没问题的：

```
function getString(something: string | number): string {
  return something.toString()  //访问了number和string的公共属性toString,是没有任何问题的！
}
```



#### 联合类型赋值的类型推断

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```
let lunarDay: string | number
lunarDay = '初一'
console.log(lunarDay.length) // 2
lunarDay = 1
console.log(lunarDay.length) // 编译时报错
```

上例中，第二行的 lunarDay 被推断成了 string，访问它的 length 属性不会报错。 而第四行的 lunarDay 被推断成了 number，访问它的 length 属性时就报错了。



#### Null 和 Undefined

`null` 是一个只有一个值的特殊类型。表示一个空对象引用。用 typeof 检测 null 返回是 `object`。 typeof 一个没有值的变量会返回 `undefined`。

null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。

在TypeScript中启用严格的空校验（--strictNullChecks）特性，使得 `null` 和 `undefined` 只能被赋值给 `void` 或本身对应的类型

在 tsconfig.json 中启用 --strictNullChecks

```
let x: number
x = 1 // 运行正确
x = undefined // 运行错误
x = null // 运行错误
```

在 tsconfig.json 中启用 --strictNullChecks，需要将x赋值为联合类型

```
let x: number | null | undefined //本身对应的类型
x = 1 // 运行正确
x = undefined // 运行正确
x = null // 运行正确
```



#### Never

never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

下面是一些返回never类型的函数：

```
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed")
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```



#### Symbol

自ECMAScript 2015起，symbol成为了一种新的原生类型，就像number和string一样。 symbol类型的值是通过Symbol构造函数创建的。

```
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
```



Symbols是不可改变且唯一的。

```
let sym2 = Symbol("key")
let sym3 = Symbol("key")

sym2 === sym3 // false, symbols是唯一的
```



像字符串一样，symbols也可以被用做对象属性的键。

```
const sym = Symbol()

let obj = {
  [sym]: "value"
}

console.log(obj[sym]) // "value"
```



Symbols也可以与计算出的属性名声明相结合来声明对象的属性和类成员。

```
const getClassNameSymbol = Symbol()

class C {
  [getClassNameSymbol](){
    return "C"
  }
}

let c = new C()
let className = c[getClassNameSymbol]() 
console.log(className)// "C"
```





## 三. ts中的函数详解

### 	3-1 函数的类型

#### 函数声明

在 JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）：

​	

```
// 函数声明（Function Declaration）
function sum(x, y) {
  return x + y
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
  return x + y
}
```

​		

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

```
function sum(x: number, y: number): number {
  return x + y
}
```



注意，**输入多余的（或者少于要求的）参数，是不被允许的**：

```
function sum(x: number, y: number): number {
  return x + y
}
sum(1, 2, 3)

// Expected 2 arguments, but got 3.
```

```
function sum(x: number, y: number): number {
  return x + y
}
sum(1)

// An argument for 'y' was not provided.
```



#### 函数表达式

如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

```
let mySum = function (x: number, y: number): number {
  return x + y
}
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}
```

注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

在 ES6 中，`=>` 叫做箭头函数，应用十分广泛，可以参考 [ES6 中的箭头函数][]。



### 3-2 用接口定义函数的形状

我们也可以使用接口的方式来定义一个函数需要符合的形状：

```
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1
}
```



### 3-3 可选参数

前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？

与接口中的可选属性类似，我们用 `?` 表示可选的参数：

```
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
  return firstName + ' ' + lastName
  } else {
  return firstName
  }
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')
```

需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**：

```
function buildName(firstName?: string, lastName: string) {
  if (firstName) {
  return firstName + ' ' + lastName
  } else {
  return lastName
  }
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName(undefined, 'Tom')

// A required parameter cannot follow an optional parameter.
```



### 3-4 参数默认值

在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数**：

```
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')
```

此时就不受「可选参数必须接在必需参数后面」的限制了：

```
function buildName(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName
}
let tomcat = buildName('Tom', 'Cat')
let cat = buildName(undefined, 'Cat')
```



### 3-5 剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

```
function push(array, ...items) {
  items.forEach(function(item) {
  array.push(item)
  })
}

let a = []
push(a, 1, 2, 3)
```

事实上，`items` 是一个数组。所以我们可以用数组的类型来定义它：

```
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
  	array.push(item)
  })
}

let a:any[] = []
push(a, 1, 2, 3)
console.log(a)  //a=[1,2,3]
```



### 3-6 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`。

利用联合类型，我们可以这么实现：

```
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
  return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
  return x.split('').reverse().join('')
  }
}
```

然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。

这时，我们可以使用重载定义多个 `reverse` 的函数类型：

```
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
  return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
  return x.split('').reverse().join('')
  }
}
```

上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。









## 四. 接口

### 4-1 接口定义

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。 TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。



#### 简单的例子

```
interface Person {
  name: string
  age: number
}

let tom: Person = {
  name: 'Tom',
  age: 25
}
```

上面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。 接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。 定义的变量比接口少了一些属性是不允许的：

```
interface Person {
  name: string
  age: number
}

let tom: Person = {
  name: 'Tom'
}
// Property 'age' is missing in type '{ name: string }' but required in type 'Person'.
```



多一些属性也是不允许的：

```
interface Person {
  name: string
  age: number
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
}

// Type '{ name: string age: number gender: string }' is not assignable to type 'Person'.
// Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

可见， *赋值的时候，变量的形状必须和接口的形状保持一致。*



### 4-2 可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```
interface Person {
  name: string
  age?: number
}

let tom: Person = {
  name: 'Tom'
}
```

```
interface Person {
  name: string
  age?: number
}

let tom: Person = {
  name: 'Tom',
  age: 25
}
```

可选属性的含义是该属性可以不存在。

这时仍然不允许添加未定义的属性：



```
interface Person {
  name: string
  age?: number
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
}

// Type '{ name: string age: number gender: string }' is not assignable to type 'Person'.
// Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```



### 4-3 任意属性（索引签名）

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```
interface Person {
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
}
```

使用 [propName: string] 定义了任意属性取 string 类型的值。 需要注意的是，一旦定义了任意属性，**那么确定属性和可选属性的类型都必须是它的类型的子集**：

```
interface Person {
  name: string
  age?: number
  [propName: string]: string
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
}

// Property 'age' of type 'number | undefined' is not assignable to string index type 'string'.
// Type '{ name: string age: number gender: string }' is not assignable to type 'Person'.
// Property 'age' is incompatible with index signature.
// Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 { `[x: string]: string | number name: string age: number gender: string }`，这是联合类型和接口的结合。



### 4-4 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```
interface Person {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  id: 89757,
  name: 'Tom',
  gender: 'male'
}

tom.id = 9527
// Cannot assign to 'id' because it is a read-only property.
```

上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了。

***注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：\***

```
interface Person {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
}

tom.id = 89757
// Property 'id' is missing in type '{ name: string gender: string }' but required in type 'Person'.
// Cannot assign to 'id' because it is a read-only property.
```

上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。 第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了









## 五. 类



传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，我们终于迎来了 `class`。

TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。



### 5-1 类的概念

虽然 JavaScript 中有类的概念，但是可能大多数 JavaScript 程序员并不是非常熟悉类，这里对类相关的概念做一个简单的介绍。

- 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口



### 5-2 ES6中类的用法

下面我们先回顾一下 ES6 中类的用法。

#### 属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例的时候，会自动调用构造函数。

```
class Animal {
  constructor(public name:string) {
   this.name = name
  }
  sayHi():string{
   return `My name is ${this.name}`
  }
}

let a = new Animal('Jack')
console.log(a.sayHi()) // My name is Jack
```



#### 类的继承

使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

```
class Cat extends Animal {
  constructor(name) {
  	super(name) // 调用父类的 constructor(name)
  }
  sayHi() {
  	return 'Meow, ' + super.sayHi() // 调用父类的 sayHi()
  }
}

let c = new Cat('Tom') // Tom
console.log(c.sayHi()) // Meow, My name is Tom
```



#### 存取器

使用 getter 和 setter 可以改变属性的赋值和读取行为：

```
class Animal{
    constructor(public name:string){
        this.name = name
    }
    get sayHi(){
        return this.name
    }
    set sayHi(value:string){
        this.name = value
    }
}
let animal = new Animal("dog");
console.log(animal.sayHi)
animal.sayHi = "pig"
console.log(animal.sayHi)
```



#### 静态方法

使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```
class Animal {
  static isAnimal(a) {
  	return a instanceof Animal
  }
}

let a = new Animal('Jack')
Animal.isAnimal(a) // true
a.isAnimal(a) // TypeError: a.isAnimal is not a function
```





### 5-3 TypeScript中类的用法

#### public private 和 protected

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public`的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

下面举一些例子：

```
class Animal{
    public name:string = "cat"
    public sayName(){
        console.log("sayName")
    }
}
let animal = new Animal()
console.log(animal.name)
animal.sayName()
```

上面的例子中，`name`与sayName 被设置为了 `public`，所以直接访问实例的属性和方法是允许的。



如果属性不能被外部进行访问的话，请设置成private

```
class Animal{
    private name:string = "cat"
    public sayName(){
        console.log("sayName")
    }
}
let animal = new Animal()
console.log(animal.name) //报错 name为私有属性，请在Animal类中进行访问
animal.sayName()
```



而如果是用 `protected` 修饰，则允许在子类中访问

```
class Animal{
    protected name:string = "cat"
    public sayName(){
        console.log("sayName")
    }
}
class Dog extends Animal{
    sayHi(){
        console.log(this.name) //子类可以访问父类的public与protected的属性和方法
    }
}
```



#### readonly

只读属性关键字，只允许出现在属性声明或索引签名中。

```
class Animal{
    readonly name:string = "cat"
    public sayName(){
        console.log("sayName")
    }
}
let animal = new Animal()
animal.name = 'dog' //报错了 name只能读取不能进行修改
console.log(animal.name) 
```







#### 抽象类

`abstract` 用于定义抽象类和其中的抽象方法。

什么是抽象类？

首先，抽象类是不允许被实例化的：

```
abstract class Animal {
  public name:string = ""
  public constructor(name:string) {
  	this.name = name
  }
  public abstract sayHi():void
}

let a = new Animal('Jack')

// Cannot create an instance of an abstract class.
```

上面的例子中，我们定义了一个抽象类 `Animal`，并且定义了一个抽象方法 `sayHi`。在实例化抽象类的时候报错了。

其次，抽象类中的抽象方法必须被子类实现：

```
abstract class Animal {
  public name:string = ""
  public constructor(name:string) {
  	this.name = name
  }
  public abstract sayHi():void
}

//抽象类中的其他方法可以不用实现，但是内部的抽象方法必须要在子类中进行实现。
class Cat extends Animal {
  public sayHi() {
    console.log(`${this.name} is eating.`)
  }
}

let cat = new Cat('Tom')
cat.sayHi()
```









## 六. 类和接口



之前学习过接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述。

这一章主要介绍接口的另一个用途，对类的一部分行为进行抽象。



### 6-1 类实现接口

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性。

举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：

```
interface Alarm {
  alert():void
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
  alert() {
  	console.log('SecurityDoor alert')
  }
}

class Car implements Alarm {
  alert() {
  	console.log('Car alert')
  }
}
```



一个类可以实现多个接口：



```
interface Alarm {
    alert():void
}
  
interface Light {
    lightOn():void
    lightOff():void
}
  
class Car implements Alarm, Light {
    alert() {
        console.log('Car alert')
    }
    lightOn() {
        console.log('Car light on')
    }
    lightOff() {
        console.log('Car light off')
    }
}
```

上例中，`Car` 实现了 `Alarm` 和 `Light` 接口，既能报警，也能开关车灯。



### 6-2 接口继承接口

接口与接口之间可以是继承关系：

```
interface Alarm {
    alert():void
}
  
interface LightableAlarm extends Alarm {
    lightOn():void
    lightOff():void
}
```

上例中，我们使用 `extends` 使 `LightableAlarm` 继承 `Alarm`。



### 6-3 接口继承类

```
class Point {
    x: number = 1
    y: number = 2
}
  
interface Point3d extends Point {
   z:number
}
  
let point3d: Point3d  = {x:1,y:2,z:3}
```







### 6-4 混合类型

之前学习过，可以使用接口的方式来定义一个函数需要符合的形状：

```
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1
}
```







## 七. 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

### 7-1 简单的例子

首先，我们来实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```
function createArray(length: number, value: any): Array<any> {
  let result = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

上例中，我们使用了之前提到过的数组泛型来定义返回值的类型。

这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：

`Array` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 `value`的类型。

这时候，泛型就派上用场了：

```
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了<T>,其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array` 中即可使用了。

接着在调用的时候，可以指定它具体的类型为 `string`。当然，也可以不手动指定，而让类型推论自动推算出来：

```
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
      result[i] = value
    }
    return result
  }
  
  createArray(3, 'x') // ['x', 'x', 'x']
```



### 7-2 多个类型的参数

定义泛型的时候，可以一次定义多个类型参数：

```
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
console.log(swap([7, 'seven'])) // ['seven', 7]
```

上例中，我们定义了一个 `swap` 函数，用来交换输入的元组





### 7-3 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length)
  return arg
}

// Property 'length' does not exist on type 'T'.
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```
interface Lengthwise {
    length: number
}
//说明T这个数据类型必须支持length属性才可以进行传入
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}
```

上例中，我们使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。

此时如果调用 `loggingIdentity` 的时候，传入的 `arg` 不包含 `length`，那么在编译阶段就会报错了：

```
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

loggingIdentity(7)

// Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
```





### 7-4 泛型接口

之前学习过接口中函数的定义，可以使用接口的方式来定义一个函数需要符合的形状：

```
interface SearchFunc {
    (source: string, subString: string): boolean
}
  
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1
}
```



当然也可以使用含有泛型的接口来定义函数的形状：

```
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>
}
  
let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

createArray(3, 'x') // ['x', 'x', 'x']
```



进一步，我们可以把泛型参数提前到接口名上：

```
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>
}
  
let createArray: CreateArrayFunc<string>
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

注意，此时在使用泛型接口的时候，需要定义泛型的类型。





### 7-5 泛型类

与泛型接口类似，泛型也可以用于类的类型定义中：

```
class  Demo<T> {
    username:T 
    add(x:T):T{
        return x
    }
}

let demo = new Demo<string>();
demo.username = "zhangsan"
demo.add("24")
```

此处 zeroValue，add 未赋值会出错，设置 "strictPropertyInitialization": false, 关闭提示





## 八. 迭代器和生成器

### 可迭代性

### for..of 语句

for..of会遍历可迭代的对象，调用对象上的Symbol.iterator方法。 下面是在数组上使用 for..of的简单例子：

```
let someArray = [1, "string", false]

for (let entry of someArray) {
  console.log(entry) // 1, "string", false
}
```



### for..of vs. for..in 语句

for..of和for..in均可迭代一个列表；但是用于迭代的值却不同，for..in迭代的是对象的键的列表，而for..of则迭代对象的键对应的值。

下面的例子展示了两者之间的区别：

```
let list = [4, 5, 6]

for (let i in list) { //i获取的是数组的下标
  console.log(i) // "0", "1", "2",
}

for (let i of list) {  //这里获取的是数组里面的每一个值
  console.log(i) // "4", "5", "6"
}
```

另一个区别是for..in可以操作任何对象, 它提供了查看对象属性的一种方法。 但是 for..of关注于迭代对象的值。内置对象Map和Set已经实现了Symbol.iterator方法，让我们可以访问它们保存的值。

```
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals"

for (let pet in pets) {
  console.log(pet) // "species"
}

for (let pet of pets) {
  console.log(pet) // "Cat", "Dog", "Hamster"
}
```





## 九. 命名空间与模块

在代码量较大的情况下，为了避免各种变量命名冲突，可将相似功能的函数、类、接口等放置到命名空间内

同java的包、.net的命名空间一样，ts的命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象。命名空间内的对象需要通过export暴露



### 命名空间和模块的区别？

 `命名空间：内部模块，主要用于组织代码，避免命名冲突`

 `模块：ts的外部模块的简称，侧重代码的复用，一个模块可能会有多个命名空间`



```
namespace A{
  interface Animal{
    name:string
    eat():void
  }
  export class Dog implements Animal{
    name:string
    eat(){
      console.log("dog吃东西！")
    }
  }
}


namespace B{
  interface Animal{
    name:string
    eat():void
  }
  export class Dog implements Animal{
    name:string
    eat(){
      console.log("b-dog吃东西！")
    }
  }
}

let dog = new A.Dog()
dog.eat()
```



同时也可以把一些内容单独抽离出去封装成一个模块，侧重代码的复用，一个模块可能会有多个命名空间

Animal.ts文件

```
export namespace A{
    interface Animal{
      name:string
      eat():void
    }
    export class Dog implements Animal{
      name:string
      eat(){
        console.log("dog吃东西！")
      }
    }
  }
  
  
export  namespace B{
    interface Animal{
      name:string
      eat():void
    }
    export class Dog implements Animal{
      name:string
      eat(){
        console.log("b-dog吃东西！")
      }
    }
  }
```



外部调用这个模块的话，需要通过import方式进行引入使用：

```
import {B,A} from "./Animal"
let dog = new A.Dog() 
dog.eat()
```









## 十. 装饰器

### 介绍

> 装饰器是一种特殊类型的声明，它能够附加到类、类的函数、类属性、类函数的参数上，以达到修改类的行为。



### 装饰器的种类

#### 根据装饰器的位置

- 类装饰器
- 类函数装饰器
- 类属性装饰器
- 类函数参数装饰器



#### 根据装饰器是否有参数

- 无参装饰器(一般装饰器)
- 有参装饰器(装饰器工厂)





### 类的装饰器

类装饰器是在类声明之前被声明。类装饰器可以应用于类构造函数，可以用来监视、修改或替换类定义

```
//普通装饰器（没有参数）  可以扩展类，给类添加额外的属性和方法
function logClass(params:any){
  // console.log(params)
  params.prototype.apiUrl = "动态扩展的属性"
  params.prototype.run = function(){
    console.log("动态扩展的run方法")
  }
}

@logClass
class HttpClient{
  getData(){

  }
}

let http:any = new HttpClient()
console.log(http.apiUrl)
http.run()
```



```
//装饰器工厂 （可以传入参数） 用的地方比较多
function logClass(params:string){
    return function(target:any){
        target.prototype.apiUrl = params
    }
}

@logClass("http://www.baidu.com")
class HttpClient{
  getData(){

  }
}

let http:any = new HttpClient()
console.log(http.apiUrl)
```



不仅可以增加类的属性与方法，还可以修改当前类的构造函数以及当前类的方法

类装饰器重载构造函数的例子



```
function logClass(target:any){
  return class extends target{
    apiUrl:string = "我是修改后的apiUrl1"
    getData(){
      console.log(this.apiUrl+"---")
    }
  }
}

@logClass
class HttpClient{
  apiUrl:string = ""
  constructor(){
    this.apiUrl = "我是构造函数里面的apiUrl"
  }
  getData(){
    console.log(this.apiUrl)
  }
}

let http:any = new HttpClient()
http.getData()
```



### 属性装饰器

属性装饰器表达式会在运行时当做函数被调用，传入下列2个参数

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- 成员的名字



```
function logProperty(params:string){
  return function(target:any,attr:any){
    console.log(target,attr)
    target[attr] = "111"
  }
}

class HttpClient{
  @logProperty("修改后的属性")
  apiUrl:string 
  getData(){
    console.log(this.apiUrl)
  }
}

let http:any = new HttpClient()
http.getData()
```





### 方法装饰器

他会被应用到方法的属性描述上，可以用来监视，修改或者替换方法定义

方法装饰会在运行时传入下列3个参数:

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- 成员的名字
- 成员的属性描述符



```
//需求，getData将传递来的参数都变成字符串类型
function propMethods(params:string){
  return function(target:any,methodName:string,desc:any){
    let oMethod = desc.value;
    desc.value = function(...args:any[]){
      args = args.map(value=>{
        return value.toString()
      })
      // console.log(args)
      oMethod.apply(this,args)
    }
  }
}

class HttpClient{
  @propMethods("asdjlksad")
  getData(...args:any[]){
    console.log(args)
  }
}

let http:any = new HttpClient()
http.getData(1,2,"222")
```





### 方法参数装饰器

参数装饰器表达式会在运行时当做函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下列3个参数

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- 方法的名字
- 参数在函数参数列表中的索引



```
function logParams(params:string){
  return function(target:any,methodName:string,paramIndex:number){
    console.log(target,methodName,paramIndex)
    target.apiUrl = params
  }
}


class HttpClient{
  getData(@logParams("XXX") param:string){
    console.log(param)
  }
}

new HttpClient().getData("hello")
console.log(new HttpClient().apiUrl)
```





### 几种装饰器的执行顺序

看一下类装饰器、属性装饰器、方法装饰器、方法参数装饰器的执行顺序？

```
function logClass1(param:string){
  return function(target:any){
    console.log("类装饰器1执行了...")
  }
}
function logClass2(param:string){
  return function(target:any){
    console.log("类装饰器2执行了...")
  }
}

function logProps(param?:string){
  return function(target:any,attr:any){
    console.log("属性装饰器...")
  }
}

function logMethod(param?:string){
  return function(target:any,attr:any,desc:any){
    console.log("方法装饰器")
  }
}

function logParams1(param?:string){
  return function(target:any,attr:any,index:any){
    console.log("logParam1执行了...")
  }
}
function logParams2(param?:string){
  return function(target:any,attr:any,index:any){
    console.log("logParam2执行了...")
  }
}


@logClass2("22")
@logClass1("11")
class HttpClient{
  @logProps()
  url:string|undefined

  @logMethod()
  getData(){
    return "getData"
  }

  setData(@logParams1() a:any, @logParams2() b:any){  

  }
}
```



发现依次执行属性装饰器、方法装饰器、方法参数装饰器、类装饰器

执行顺序是从后往前的顺序执行









[ES6 中的箭头函数]: https://www.cnblogs.com/mengff/p/9656486.html

