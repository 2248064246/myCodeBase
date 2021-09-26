'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function classDecorator(constructor) {
    console.log(constructor);
    return class extends constructor {
        constructor() {
            super(...arguments);
            // 可以重新返回一个构造函数
            this.name = 'Tom'; // 在这里会继承Cat, 然后在初始化 this.name = Tom
            /* 这里会破坏实例的 constructor  */
        }
    };
}
// @sealed // 装饰器可以叠加
let Cat = class Cat {
    constructor() {
        this.name = 'cat';
        console.log(this.name);
    }
    getName() {
        return 'hello' + this.name;
    }
};
Cat = __decorate([
    classDecorator
], Cat);
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
function readonly(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.writable = !value;
    };
}
class Dog {
    constructor() {
        this.name = 'dog';
    }
    // @readonly // 限制sayName只读
    sayName() {
        return 'hello, i am ' + this.name;
    }
}
__decorate([
    readonly(true) // 也可以使用这个工厂模式
], Dog.prototype, "sayName", null);
let dog = new Dog();
console.log(dog.sayName());
dog.sayName = function () {
    // 此处修改只读属性将不被允许
    return 'xx' + this.name;
};
console.log(dog.sayName());
