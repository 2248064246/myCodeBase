/**
 * 实现一个批量请求函数 multiRequest(urls, maxNum)
 * - 要求最大并发数 maxNum
 * - 每当有一个请求返回, 就留下一个空位, 可以增加新请求(这个的意思是让请求数总是保持 maxNum)
 * - 所有请求完成后, 结果按照 urls 里面的顺序依次打出
 */

function multiRequest(urls, maxNum) {
  let urlsC = [...urls];  
  let result = new Array(urls.length);
  let state = new Array(urls.length).fill(0); // 用于判断请求是否全部完成

  let queueLimit = Math.min(maxNum, urls.length);
  let queue = [];

  /* 初始化队列请求, 在此处限制队列长度 */
  while (enqueue(queue, urls.shift()) < queueLimit) {}

  let promise = {
    resolve: '',
    reject: ''
  };
  return new Promise((resolve, reject) => {
    promise.resolve = resolve;
  });

  function request(queue, url) { // 模拟请求
    console.log('开始任务', url)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('完成任务', url)
        /* 保证result, state 结果和 urls 顺序相同 */
        let i = urlsC.indexOf(url);
        result[i] = url;
        state[i] = 1;
        /*执行完一个请求后, 执行出队操作 */
        dequeue(queue, url);
        resolve();
      }, 1000 * Math.floor(Math.random() * 5 + 1));
    });
  }

  function dequeue(queue = [], url) { 
    /* 一个请求完成, 出队, 下一个入队(如果有的话) */
    queue.splice(queue.indexOf(url), 1);
    if (urls.length) {
      enqueue(queue, urls.shift());
    } else {
      /* 判断所有请求完成, 再 resolve */
      if (state.indexOf(0) == -1) {
        promise.resolve(result);
      }
    }
  }

  function enqueue(queue = [], url) {
    /* 请求入队, 并触发数据请求, 返回队列长度 */
    let len = queue.push(url);
    request(queue, url);
    return len;
  }
}

console.time();
multiRequest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 6).then((v) => {
  console.log('result', v);
  console.timeEnd();
});
