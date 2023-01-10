# Class

class 声明一个基于原型继承的给定名称的新类

> 类名称不允许重复, 否则会报错
> 类声明体在严格模式下运行, 构造函数可选
> 类声明不可提升

## 类和构造函数

只有函数才有 prototype 属性, 对象中的是 `__proto__`

箭头函数方式定义的函数没有 prototype 属性, this 规则也不同, 所有箭头函数无法作为构造函数使用

除此之外: bind 返回的函数不会继承原本函数的 prototype

## new.target

通过在函数中使用 new.target 可以判断函数是否由 new 调用, 如果返回值值 undefined 则表明是普通形式调用

## 静态方法 static

静态方法是直接给构造函数定义新属性, 而不是在 prototype 上定义

只能通过类访问

## 公有, 私有, 静态属性

私有: 只能在类中访问
公有: 可以在类中, 实例中访问
静态: 只能通过类名访问
受保护: 只能在类和子类中访问

> 私有属性必须先定义

```js
class A {
  #size; // 使用 # 定义私有属性
  constructor() {
    this.#size = 1; //
  }
}
```
## 类装饰器

## 超调用

> 用于访问和调用对象父级上的函数。

**语法**

```js
super([arguments]); // calls the parent constructor.
super.functionOnParent([arguments]); // 调用父级函数
```

对于继承的类, 通过 super 调用父类构造函数是, 必须先于 this 出现

```js
class Rectangle {
  constructor(height, width) {
    this.name = 'Rectangle';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
  get area() {
    return this.height * this.width;
  }
  set area(value) {
    this._area = value;
  }
}

class Square extends Rectangle {
  constructor(length) {
    this.height; // ReferenceError, super needs to be called first!

    // Here, it calls the parent class's constructor with lengths
    // provided for the Rectangle's width and height
    super(length, length);

    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = 'Square';
  }
}
```

### 超调用 静态方法

可以适用`super` 调用 静态方法

### 删除超调用属性会抛出错误

```js
class Base {
  foo() {}
}
class Derived extends Base {
  delete() {
    delete super.foo; // this is bad
  }
}

new Derived().delete(); // ReferenceError: invalid delete involving 'super'.
```

### 无法重写被设置为不可写的超调用属性

```js
class X {
  constructor() {
    Object.defineProperty(this, 'prop', {
      configurable: true,
      writable: false,
      value: 1,
    });
  }
}

class Y extends X {
  constructor() {
    super();
  }
  foo() {
    super.prop = 2; // Cannot overwrite the value.
  }
}

var y = new Y();
y.foo(); // TypeError: "prop" is read-only
console.log(y.prop); //
```

### 在对象字面量中使用 super

得益于 Object.setPrototypeOf() 方法将一个对象设置到另一个对象的原型上.

```js
var obj1 = {
  method1() {
    console.log('method 1');
  },
};

var obj2 = {
  method2() {
    super.method1();
  },
};

Object.setPrototypeOf(obj2, obj1);
obj2.method2(); // logs "method 1"
```

> 这里有一点很重要, 一旦`setPrototypeOf` 之后, 这个 super 就被固定了

```js
const parent1 = { prop: 1 };
const parent2 = { prop: 2 };

const child = {
  myParent() {
    console.log(super.prop);
  },
};

Object.setPrototypeOf(child, parent1);
child.myParent(); // logs "1"

const myParent = child.myParent;
myParent(); // still logs "1"

const anotherChild = { __proto__: parent2, myParent };
anotherChild.myParent(); // still logs "1"
```
