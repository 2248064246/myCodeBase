/*
 * @Author: huangyingli
 * @Date: 2021-12-26 22:33:53
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-10 18:10:42
 * @Description:
 */
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
    reject: '',
  };
  return new Promise((resolve, reject) => {
    promise.resolve = resolve;
  });

  function request(queue, url) {
    // 模拟请求
    console.log('开始任务', url);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('完成任务', url);
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

// console.time();
// multiRequest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 6).then((v) => {
//   console.log('result', v);
//   console.timeEnd();
// });

// ============== 通过 async await 实现 =======s========

class AsyncQueue {
  static EOS = Symbol('end-of-stream');
  constructor(limit, operation) {
    this.limit = limit;
    this.operation = operation;

    this.resolveList = [];
    this.waitList = [];
    this.promiseList = [];
    this.closed = false;
  }

  createPromise() {
    let p = new Promise((resolve) => {
      this.resolveList.push(resolve);
    });
    this.promiseList.push(p);
  }

  execOperation(data) {
    this.operation(data).then((res) => {
      let resolve = this.resolveList.shift();
      console.log('触发事件', this.resolveList.length);
      resolve(res);
    });
  }

  enqueue(data) {
    console.log('promise length', this.resolveList.length);
    if (this.resolveList.length < this.limit) {
      this.createPromise();
      console.log('promise create');
      this.execOperation(data);
    } else {
      this.waitList.push(data);
    }
  }

  dequeue() {
    if (this.waitList.length > 0) {
      let data = this.waitList.shift();
      this.enqueue(data);
    } else if (this.closed) {
      return Promise.resolve(AsyncQueue.EOS);
    } else if (this.resolveList.length === 0) {
      this.createPromise();
    }
    let p = this.promiseList.shift();
    return p;
  }

  [Symbol.asyncIterator]() {
    return this;
  }
  next() {
    return this.dequeue().then((value) =>
      value === AsyncQueue.EOS
        ? { value: undefined, done: true }
        : { value: value, done: false }
    );
  }

  close() {
    while (this.resolveList.length > 0) {
      this.resolveList.shift()(AsyncQueue.EOS);
    }
    this.closed = true;
  }
}

function request(data) {
  console.log('创建请求', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000 * Math.floor(Math.random() * 5 + 1));
  });
}
let asyncQueue = new AsyncQueue(5, request);

let datas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('asyncQueue', asyncQueue);

async function test() {
  datas.forEach((i) => {
    asyncQueue.enqueue(i);
  });
  let i = 0;
  let ary = [];
  for await (const value of asyncQueue) {
    i++;
    // console.log(value);
    ary.push(value);
    console.log('请求结果', value);
    if (i == datas.length) {
      asyncQueue.close();
    }
  }
  console.log(
    '请求全部结束',
    ary.sort((a, b) => a - b)
  );
}

// test();

function eventStream(elt, type) {
  const q = new AsyncQueue(4, function (data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 300);
    });
  });
  elt.addEventListener(type, (e) => q.enqueue(e));
  return q;
}

async function handleKeys() {
  /* 此迭代器会等待键盘事件, 按下按键便会触发一个期约兑现 */
  for await (const event of eventStream(document, 'keypress')) {
    console.log(event.key);
  }
}

handleKeys();
