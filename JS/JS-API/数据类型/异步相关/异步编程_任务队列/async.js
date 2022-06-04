// {
// promise的写法
//     let p1 = ()=>new Promise((resolve, reject)=> {
//         resolve('hello');
//     });

//     function fn () {
//         p1().then(res=>{
//             console.log('demo1-1', res);
//         });

//         // then(),Promise() 是异步的, 先输出demo1-2
//         console.log('demo1-2');
//     }
//     fn();
// }


// {
//     // 这个的写法和 new Promise((resolve, reject)=> {
//     //      resolve() / reject()
//     // })  
//     // 是一样的
//     let p1 = ()=>Promise.resolve('hello');
//     async function fn() {
//         // 先执行完promise, await会接收resolve的返回值
//         let res = await p1();
//         // 这个是顺序输出
//         console.log('demo2-1', res);
//         console.log('demo2-2');
//     }
//     fn();
// }

// {
//     let p1 = ()=>Promise.resolve('hello');
//     async function fn() {
//         // async() 返回的是一个 promise对象, 
//         // 无论return中的是数值还是什么, 都会变为promise对象
//         return await p1();
//     }
//     fn().then(res=>{
//         console.log('demo3-1', res);
//     });
// }

// {
//     // 这个返回错误, 但是如果promise实例中没有接收处理的方法会报错
//     let p1 = ()=>Promise.reject('hello');
//     async function fn() {
//         return await p1();
//     }
//     // fn().then(res=>{
//     //     console.log('demo3-1', res);
//     // },
//     // // 增加错误处理
//     // err=>{
//     //     console.log('err3-1', err);
//     // }
//     // );

//     // 或者通过catch捕获错误
//     fn().then().catch(err=>{
//         console.log('catch', err);
//     })
// }

// {
//     // try{}catch{}的错误捕获
//     let p1 = ()=>Promise.reject('hello');
//     async function fn() {
//         try{
//             await p1();
//         }catch(e) {
//             console.log('err5-1', e);
//         }
//         // 没有 await 返回的也是promise对象, 但是这个 是同步的, 会先于异步代码返回
//         // return 100;

//         // 只有当前面对的都执行完成了, 才会返回
//         // 这就是 await(等候)
//         return await 100;
//     }
//     fn().then(res=>{
//         console.log('ok', res);
//     });
// }

// 串行和并行
// 串行: 一步一步的执行
// 并行: 一起执行

// 串行写法

// {
//     let getP1 = () => Promise.resolve('p1');
//     let getP2 = () => Promise.resolve('p2');

//     let fn = async ()=> {
//         let p1val = await getP1();
//         let p2val = await getP2();
//         console.log(p1val, p2val);
//     }
//     console.time();
//     fn();
//     console.timeEnd();
// }

// 并行写法
// 这种写法可以 有效提高速度
// {
//     let getP1 = () => Promise.resolve('p1');
//     let getP2 = () => Promise.resolve('p2');
//     let fn = async ()=> {
//         let doP1 = getP1();
//         let doP2 = getP2();
//         let p1val = await doP1;
//         let p2val = await doP2;
//         console.log(p1val, p2val);
//     }
//     console.time();
//     fn();
//     console.timeEnd();
// }

// 并行2 

// {
//     let getP1 = () => Promise.resolve('p1');
//     let getP2 = () => Promise.resolve('p2');
//     let fn = async()=> {
//         // 弊端, 一旦里面有一个错误, 就返回 reject了, 
//         let values = await Promise.all([getP1(), getP2()]);
//         console.log(values);
//     }
//     console.time();
//     fn();
//     console.timeEnd();
// }



// Thenable Objects 支持
async function f2() {
    const thenable = { // 这种对象是支持的
        then: function (resolve, _reject) {
            resolve('resolved!')
        }
    };
    console.log(await thenable); // resolved!
}

f2();


// promise reject
// 如果promise 被拒绝, 则抛出被拒绝的值
async function f4() {
    try {
        var z = await Promise.reject(30); // 这里会直接抛出异常, 需要catch 捕获错误
    } catch (e) {
        console.error(e); // 30
    }
}

f4();