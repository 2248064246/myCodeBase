'use strict';
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function classDecorator<T extends { new (...args: any): {} }>(constructor: T) {
  console.log(constructor);
  return class extends constructor {
    // 可以重新返回一个构造函数
    name = 'Tom'; // 在这里会继承Cat, 然后在初始化 this.name = Tom
    /* 这里会破坏实例的 constructor  */
  };
}

// @sealed // 装饰器可以叠加
@classDecorator
class Cat {
  name: string;
  constructor() {
    this.name = 'cat';
    console.log(this.name);
  }
  getName() {
    return 'hello' + this.name;
  }
}

// Cat.prototype.getName = function () { // 不允许修改, 严格模式下报错
//   return 'xxx';
// };

let cat = new Cat();

console.log(cat.getName()); // helloTom

// function readonly(
//   target: any,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ) {
//   descriptor.writable = false;
// }

function readonly(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.writable = !value;
  };
}

class Dog {
  name: string = 'dog';
  // @readonly // 限制sayName只读
  @readonly(true) // 也可以使用这个工厂模式
  sayName() {
    return 'hello, i am ' + this.name;
  }
}

let dog = new Dog();

console.log(dog.sayName());

dog.sayName = function () {
  // 此处修改只读属性将不被允许
  return 'xx' + this.name;
};
console.log(dog.sayName());
