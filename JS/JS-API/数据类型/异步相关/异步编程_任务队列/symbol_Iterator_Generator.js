// =============================
// Symbol
{
    let obj = {
        name: 'Tom'
    }
    // 创建symbol变量
    let name1 = Symbol('name');
    let name2 = Symbol('name');
    // 使用symbol变量设置属性, 不会覆盖原有的属性值
    obj[name1] = '小明';
    obj[name2] = '小红';
    console.log(obj);

    console.log(obj[name1]); // 获取symbol变量属性的值
    for (const key in obj) {
        console.log(obj[key]); // for...in循环(所有数据循环中)中得不到symbol变量属性
    }

    let symbolKey = Object.getOwnPropertySymbols(obj); // 获取对象中所有的symbol变量属性名, 并返回数组
    for (const v of symbolKey) {
        console.log(obj[v]); // v: 代表属性名
    }
}

// =====================================

//==========================================
// Iterator
// 让对象可以迭代
// 原生对象存在Iterator的有(可以迭代的对象)
//      Array, Map, Set, String, arguments, NodeList
{
    let ary = [1,2,4,5];
    // for...of 循环就是用的 iterator 迭代实现
    for(const value of ary) {
        console.log(value);
    }
    let str = '12345';
    for(const value of str) {
        console.log(value); // 输出一个个数字字符 
    }

    // 迭代器的实现原理
    let iterator = function(obj) {
        let index = 0;
        return {
            next: ()=>{
                if(index<obj.length) {
                    return obj[index++]
                }else {
                    return null;
                }
            }
        }
    }
    let it = iterator(ary);
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
}
// =======================================

// =======================================
// Generator
// Iterator生成器
// ES6提供的一个异步编程解决方案
{
    let generator = function *() {
        console.log(1);
        let a =yield 2; // yield 可以把值传出去
        console.log(a); // yield 也可以接收外面传进来的值
        let b = yield 3;
        console.log(b);
        return 4; // return的值会被next() 返回,并且此时iterator[done] == true, 迭代完成
    }   
    let it = generator();
    console.log(it.next(10)); // 第一个传入的值永远都是没有效的
    console.log(it.next(20));
    console.log(it.next(30));

    // 在 for...of循环中, return返回的值并不会被接收...
    for(const value of generator()) {
        console.log('value',value); // 得到 yield 返回的值
    }
}