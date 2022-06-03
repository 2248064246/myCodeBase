/*
 * @Author: huangyingli
 * @Date: 2022-06-02 22:55:28
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-06-03 01:46:06
 * @Description:
 */
let p = new Promise((resolve, reject) => {
  // throw TypeError('xxx')
  resolve('123');
});

setTimeout(() => {
  let x = p.then((res) => console.log('x', res));
});
let y = p.then((res) => console.log('y', res));

window.addEventListener('unhandledrejection', (event) => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);

  // 防止默认处理（例如将错误输出到控制台, NodeJS 中）

  event.preventDefault();
});

let yy  = new Promise((resolve, reject) => {
  reject('未知错误');
});
