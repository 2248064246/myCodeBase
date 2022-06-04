/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-08 14:14:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 17:22:03
 * @Description:
 */

let queue = [1, 2, 3];
let index = 0;
let start = true;
let timer
// 需要循环队列
async function queueNotify() {
  while (true) {
    if (!start) {
      clearTimeout(timer)
      return false
      break;
    }
    await sleep(1000);
    if (index >= queue.length) index = 0;
    console.log(queue[index++]);
  }
}

function sleep(delay) {
  return new Promise((resolve, reject) => {
    clearTimeout(timer);
    timer = setTimeout(resolve, delay);
  });
}

/**
 * 调用这个停止循环, 返回一个promise
 * @returns 
 */
function stopNotify() {
  start = false
  return queueNotify()
}

// queueNotify()

// queue.push(4)

// stopNotify().then(() => {
//   start = true
//   queueNotify() // 停止后重启
// })


