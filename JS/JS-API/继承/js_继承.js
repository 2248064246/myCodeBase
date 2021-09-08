
// 私有属性方法 和公有属性方法
// 在 prototype上的方法和属性数公有的, 
// 函数, 和类 中才有 prototype属性, 指向原型的堆空间(原型数对象类型)
// 普通对象, 数组, 实例, 中有 __proto__ 属性, 指向构造它的函数的 prototype空间
// 所有对象默认 __proto__最终都指向 Object 类型
// 通过 instanceof 可以判断这个实例时候属于 某一个类, 但是对于在默认情况下, 所有的实例都属于 Object类
// 默认创建的的 实例中有一个 constructor属性 执行创建它的类
// Object.create()



// 原型链继承
// 并不是把父类中的属性和方法克隆一份给子类， 而是让 子类和 父类之间增加了 原型链的链接
// 子类想要使用父类的方法， 需要沿着原型链一级级向上查找
// 子类可以通过原型链更改父类原型中的方法（这就是 重写）
function Human() {
    this.speed = 30;
    // 如果私有属性是 引用数据， 那么所有实例通过原型链修改这个引用数据，其他实例都会受到影响
}
Human.prototype.run = function() {
    console.log('I can run, speed : ' + this.speed);
}
function WhiteH() {
    this.speed = 40;
}
// 关于new
// 将 Human函数中私有变量和属性设置给 WhiteH.prototype 对象
// 同时有个属性 __proto__ 指向 Human.prototype 对象
// 会创建一个 实例
WhiteH.prototype = new Human;
// 这里constructor 并不会向 __proto__上找
// 对于赋值, 当前空间中没有就会直接创建, 不会沿着__proto__查找
WhiteH.prototype.constructor = WhiteH;

var person1 = new WhiteH();
person1.run();
console.log(person1.constructor);
console.log(Human.prototype.constructor);


// 构造函数继承
// 通过 call方法 克隆父类的私有属性和方法
function Human() {
    this.speed = 30;
}
Human.prototype.run =function(){
    console.log('I can run, speed : ' + this.speed);
}
function WhiteH() {
    // 通过 call 函数 改变 this的指向
    // 原本 Human() 的this 是 window, 但是 Human.call(this) this是当前函数了(WhiteH)
    // 这句话意思就是将 Human中的私有属性和方法 放到了 当前函数中执行
    Human.call(this);
    // 这就解决了原型链继承纵 父类的引用数据类型的问题,
    // 所有的子类都会具备一分父类的私有属性和方法(深克隆)
}
// 由于没有将子类(WhiteH)的原型指向 父类的 原型, 所有无法使用父类原型上的方法
var person1 = new WhiteH;
console.log(person1.speed);


// 组合继承
// 组合原型链继承和构造函数继承得来
// 通过原型链继承父类 prototype 上的方法, 通过构造继承父类的 私有属性和方法
// 原型链也会继承父类的私有属性和方法, 但是需要 子类 实例 通过 __proto__查找
// 而实例继承了 子类 中和父类一模一样的方法和属性, 不会通过 __proto__ 向上查找, 但是__proto__上存在 原型链继承的方法和属性
function Human() {
    this.speed = 30;
}
Human.prototype.run = function() {
    console.log('I can run, speed : ' + this.speed);
}
function WhiteH() {
    Human.call(this);
}
// 有个弊端就是执行了两次 父类(Human) 方法, 浪费性能, 而且存在两份相同的数据
WhiteH.prototype = new Human;
// new Human 有一个 更好的方案: 使用 Object.create(Human.prototype) 替代
// (这个的作用就是使用 "中间人" 将 WhiteH被摸除的 prototype补全, 并将__proto__指向 父类的prototype)
// 这个中间人只会继承 父类的 prototype中方法和属性, 而不会继承私有属性和方法
WhiteH.prototype.constructor = WhiteH;
var person1 = new WhiteH;
person1.run();


// 原型式继承
// 特点和原型链相似
// 不存在所谓公共属性, 所有的都是继承 Human中的私有属性和方法
var Human = {
    speed: 30,
    run: function() {
        console.log('I can run, speed : ' + this.speed);
    }
}
function WhiteH () {

}
WhiteH.prototype = Human;
var person1 = new WhiteH;
person1.run();

// 寄生继承继承
// 使用 中间人 来削弱子类和父类的关系
function Human() {
    this.speed= 30;
}
Human.prototype.run = function(){
    console.log('I can run, speed : ' + this.speed);
}
function WhiteH () {

}
WhiteH.prototype = Object.create(Human.prototype);
var person1 = new WhiteH;
// 只能继承 父类 prototype中的方法和属性, 私有属性不会继承
// person1.run();

// 寄生组合继承
// 将寄生继承 和 组合继承结合
function Human() {
    this.speed= 30;
}
Human.prototype.run = function(){
    console.log('I can run, speed : ' + this.speed);
}
function WhiteH () {
    // 使用 call 继承 私有属性和方法
    Human.call(this);
}
// 使用中间人(寄生) 继承 公有属性和方法, 并且增加了一个 中间人 弥补WhiteH 失去的 Prototype, 削弱父类实例和子类实例的联系
WhiteH.prototype = Object.create(Human.prototype);
WhiteH.prototype.constructor = WhiteH;
var person1 = new WhiteH;
person1.run();
console.log(person1.constructor);


// function create(o) {
//     var f = function() {

//     }
//     f.prototype = o;
//     return new f;
// }