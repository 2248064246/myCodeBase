/*
 * @Author: huangyingli
 * @Date: 2022-02-15 17:09:27
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-20 17:29:55
 * @Description:
 */

interface IteratorInterface {
  value: any;
  done: boolean;
}

/**
 *  * 实现一个批量请求函数 multiRequest(urls, maxNum)
 * - 要求最大并发数 maxNum
 * - 每当有一个请求返回, 就留下一个空位, 可以增加新请求(这个的意思是让请求数总是保持 maxNum)
 * - 所有请求完成后, 结果按照 urls 里面的顺序依次打出
 */

/**
 * 基于async/await的异步队列流
 */
interface AsyncQueue {
  limit: number;
  operation: Function;
  resolveList: Array<any>;
  waitList: Array<any>;
  promiseList: Array<Promise<any>>;
  closed: Boolean;
  /**
   * 创建异步队列
   */
  createPromise(): void;
  /**
   * 执行操作函数
   * @param {*} data
   */
  execOperation(data: any): void;
  /**
   * 需要操作的数据入队
   * @param {*} data
   */
  enqueue(data: any): void;

  dequeue(): Promise<any>;

  next(): Promise<IteratorInterface>;

  close(): void;
}
class AsyncQueue {
  static EOS = Symbol('end-of-stream');
  /**
   *
   * @param {Number} limit 限制流速
   * @param {Function} operation 用于操作队列数据的函数, 必须返回一个Promise
   */
  constructor(limit: number, operation: Function) {
    this.limit = limit;
    this.operation = operation;
    /* 执行队列 */
    this.resolveList = [];
    /* 排队等待队列 */
    this.waitList = [];
    /* 执行队列的promise队列 */
    this.promiseList = [];
    this.closed = false;
  }

  createPromise() {
    /* 通过resolve来控制Promise */
    let p = new Promise((resolve) => this.resolveList.push(resolve));
    /* 需要存储这个promise, 以便获取返回结果 */
    this.promiseList.push(p);
  }

  execOperation(data: any) {
    /* 执行队列操作函数, 并推出并执行一个队列Promise的resolve控制器 */
    /* 这里会导致一个Promise被触发 */
    this.operation(data).then((res: any) => this.resolveList.shift()(res));
  }

  enqueue(data: any) {
    /* 限制执行队列入队数量, 超过数量需要等待已有数据出队才能再入队 */
    if (this.resolveList.length < this.limit) {
      /* 生成一个队列Promise */
      this.createPromise();
      this.execOperation(data);
    } else {
      this.waitList.push(data);
    }
  }

  dequeue(): Promise<any> {
    if (this.waitList.length > 0) {
      /* 如果有数据在排队, 则推入队首进入执行队列末尾 */
      let data = this.waitList.shift();
      this.enqueue(data);
    } else if (this.closed) {
      return Promise.resolve(AsyncQueue.EOS);
    } else if (this.resolveList.length === 0) {
      /* 运行迭代器时, 会首先到达这里, 需要初始化执行队列 */
      this.createPromise();
    }
    return this.promiseList.shift() as Promise<any>;
  }

  [Symbol.asyncIterator]() {
    return this;
  }
  next(): Promise<IteratorInterface> {
    if (
      this.waitList.length === 0 &&
      this.resolveList.length === 0 &&
      this.promiseList.length === 0
    ) {
      return Promise.resolve({ value: undefined, done: true });
    } else {
      return this.dequeue().then((value: any) =>
        value === AsyncQueue.EOS
          ? { value: undefined, done: true }
          : { value: value, done: false }
      );
    }
  }

  close() {
    while (this.resolveList.length > 0) {
      this.resolveList.shift()(AsyncQueue.EOS);
    }
    this.closed = true;
  }
}

export default AsyncQueue;
