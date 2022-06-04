//  异步场景的对比


// 对于知识获取数据, promise 和 generator 差距不大
// 对于有逻辑判断的数据, promise 的获取比较繁杂, generator 更加便利


// function interval (callback, delay) {
//     let id = setInterval(()=> callback(id), delay);
// }

// interval(id=> {

// }, 1000)


// js的单线程异步非阻塞模式
// 1. 只有主线程都完成了才会执行 任务队列里面的异步代码(轮询),
//      1. 主线程完成轮询队列
// 2. 任务队列
//      1. 主任务 同步代码
//      2. 微任务 promise 会开辟微任务空间, 将异步代码放入微任务
//          1. 微任务优先级高于宏任务
//          2. Promise 中的同步代码还以以主任务模式进行  -> promise 的状态是单个的, 只能是 resolve 和 reject中的一个
//          3. resolve() 会将添加到微任务中
//      3. 宏任务 setInterval, setTimeout 等的异步
//          1. 微任务完成了才会执行宏任务

// setTimeout(()=>console.log('setTimeout'), 10); // 这个最后执行

// new Promise((resolve, reject) => {
//     resolve('promise');
//     // 这个是第一个执行, 这是一个同步代码
//     console.log('yes');
// }).then(res=>{
//     // 这个第三个
//     console.log(res);
// });
// // 这个第二个
// console.log('first');


// let p1 = new Promise((resolve, reject)=>{
//     resolve('resolve');
// })

// let p2 = p1.then(res=>{
//     console.log(res);
//     return res;
// })
// // p1 是 resolve, p1 执行了 resolve
// console.log(p1);
// // 在这里 p2 是准备阶段 pending, p1 返回了一个promise对象, p2 等待p1 结束
// // 由于这个是同步代码, 会继续执行,此时p2是 准备阶段
// console.log(p2);

// // setTimeout 是宏任务阶段, 要等待 promise的微任务处理完才会执行
// setTimeout(()=>{
//     console.log(p1);
//     // 所以此时的 p2 是 resolve 阶段
//     console.log(p2);
// })


// 其他类型的promise 封装
// let p1 = new Promise((resolve, reject)=>{
//     resolve('resolve');
// });

// p1.then(res=>{
//     return {
//         // 使用 then 关键字封装为promise 方法
//         then: (resolve, reject)=>{
//             resolve(res);
//         }
//     }
// }).then(res=>{
//     console.log(res);
// })



// 封装ajax异步操作
//  function ajax(url) {
//      return new Promise((resolve, reject) => {
//          let xhr = new XMLHttpRequest;
//          xhr.open('get', url);
//          xhr.send();
//          xhr.onload = function () {
//              if (this.status === 200) {
//                  resolve(JSON.parse(this.response));
//              } else {
//                 reject('读取出错!');
//              }
//          }
//          xhr.onerror = function() {
//              reject(this);
//          }
//      })
//  }

//  promise 错误抛出情况
//      1. reject()
//      2. throw new Error()
//      3. 系统错误(未定义, 语法错误等等...)
//      4. 最好使用 catch 来接收错误, 就不用每一次都去处理
//          1. 在异步函数中 外部无法捕获到函数里面抛出的错误
//              对于典型的事件绑定, 当绑定事件的时候, 事件方法并没有执行(异步), 在外部监测错误是没有的(只绑定没执行). 而事件方法执行之后, 错误监测已经过去了, 抛出了也监测不到
//              所以要把错误监测放在 异步函数中 
//              (关键: 错误也会冒泡, 会一级一级向上, 直到遇到相应的处理机制)
//      5. 没有错误, 也没有resolve, 默认返回的 resolve(), 值是undefined



// 封装定时器
// function timeOut(delay) {
//     return new Promise((resolve, reject)=>{setTimeout(resolve, delay)});
// }

// timeOut(2000).then(res=>{
//     console.log('两秒后出现');
//     return timeOut(2000);
// }).then(res=>{
//     console.log('四秒后出现');
// });


// resolve 的后台缓存
// 使用 函数也是对象的 特性, 向函数上增加对象来存储数据
// 每次请求的时候先检查 这个函数对象上有没有这个数据
// 如果有就直接拿到这个数据， 而不用请求数据库
// 如果没有就请求数据库, 并将得到的值存储到这个对象上


//  allsSettled( ) 无论是否返回 reject()(出错了) 都可以向下执行


// race( ) 比较谁的更快


// promise 队列原理
// 等待上一个 promise 执行完在执行后一个
// 在 resolve 中返回一个新的 promise, 只有这个 promise执行完成了, 后面的then 才会执行
// 队列每一个成员都要是 一个 promise , 只有上一个promise 执行完成下面的 才会执行

// 使用 map 实现
// function queue(promiseArr = []) {
//     // let promise = Promise.resolve();
//     // promiseArr.map(v=>{
//     //     promise = promise.then(()=>v());
//     // });

//     promiseArr.reduce((promise, item) => {
//         return promise.then(() => {
//             return new Promise((res, rej) => {
//                 setTimeout(() => {
//                     console.log(item);
//                     res();
//                 }, 1000);
//             });
//         });
//     }, Promise.resolve());
// }

// function p1() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(1);
//             resolve();
//         }, 2000)

//     })
// }

// function p2() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(2);
//             resolve();
//         }, 2000)
//     })
// }
// queue([1, 2, 3, 4]);


// async 语法糖
// 

// function sleep(delay) {
//     return new Promise((resolve, reject) =>{
//         setTimeout(()=>{
//             resolve();
//         }, delay)
//     }) 
// }
// async function show() {
//     for(var i = 0; i<10; i++) {
//         await sleep(1000);
//         console.log(i);
//     }
// }
// show();


// for(var k = 0 ; k< 10; k++) {
//     ((k)=>{
//         setTimeout(()=>{
//             console.log(k)
//         }, 1000 * (k+1))
//     })(k)
// }

// function sleep(delay, n) {
//     return new Promise((resolve, reject) =>{
//         setTimeout(()=>{
//             console.log(n)
//             resolve(n+1);
//         }, delay)
//     }) 
// }
// // sleep(1000, 1).then(res=>{
// //     return sleep(1000, res);
// // }).then(res=>{
// //     return sleep(1000, res);
// // })
// let show = sleep(1000, 1);
// for(var i = 0 ; i< 10; i++) {
//     show = show.then(res=>{
//         return sleep(1000, res);
//     });
// }


// 类的promise 封装
class User {
    constructor(name) {
        this.name = name;
    }
    // 在使用 new 的时候, 会返回一个promise实例(这个是错误的, 只是他有一个then方法, 然后可以和promise 中的 then 一样使用而已)
    then(resolve, reject) {
        setTimeout(()=>{
            let user = {};
            user.name = this.name;
            resolve(user);
        }, 1000);
    }

    // 在类中使用 async
    async get(name) {
        let userData = await new User(name);
        userData.age = 10;
        return userData;
    }
}
async function show() {
    // User 类的实例就成了一个 promise对象, 这个promise中依然有私有属性
    console.time();
    let player1 =  new User('小明');
    let player2 = new User('小明');
    let player1N = await player1;
    let player2N = await player2;
    console.log(player1N, player2N);
    console.timeEnd();
}
// show();
new User().get('小红').then(res=>console.log(res));

// function player(name) {
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve(name);
//         }, 1000);
//     });
// }

// async function show() {
//     // User 类的实例就成了一个 promise对象, 这个promise中依然有私有属性
//     console.time();
//     let player1 = player('小明');
//     let player2 = player('Tome');
//     let player1N = await player1;
//     let player2N = await player2;
//     console.log(player1N, player2N);
//     console.timeEnd();


//     // 或者这么写, 使用promise.all();
//      let result = await promise.all([player1(), player2()]);
// }
// show();


