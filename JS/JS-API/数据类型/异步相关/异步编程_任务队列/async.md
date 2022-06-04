
# async 

ES2017 引入的标准, 使异步操作更加方便, 是Generator 和 Promise 函数的语法糖

语法糖

  + 指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用使代码更加直观, 维护更好

## 规范

async 关键字
1. 返回值是一个Promise, 无论函数内是否有await操作
2. 函数内部return 返回的值, 会成为then回调函数的参数
3. 函数内部如果抛出错误, 会被then的第二个参数或catch捕获到

await 关键字
1. 只在async函数中出现.普通函数内部会报错
2. 正常下, wait后面是一个Promise 对象
3. 如果await后面不是Promise , 就直接返回对应的值 (会将其转为 Promise.resolve())
4. await 获取的是 resolve 或者 reject 的结果
5. 如果是 reject, 则直接抛出一个错误, 需要catch 捕获

