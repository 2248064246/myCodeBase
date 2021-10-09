/**
 * 一个异步可迭代队列
 * enqueue()添加值, dequeue()移除值, dequeue() 返回一个期约.
 * 这个类实现了 [Symbol.asyncIterator] 和 next(), 可以与 for/await一起使用
 * 在调用 close()方法前, 循环不会终止
 */
class AsyncQueue {
  static EOS = Symbol('end-of-stream');
  constructor() {
    this.values = [];
    this.resolvers = [];
    this.closed = false;
  }

  enqueue(value) {
    if (this.closed) {
      throw new Error('AsyncQueue Closed');
    }
    if (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift();
      resolve(value);
    } else {
      /* 入队大于出队情况下, 临时保存值 */
      this.values.push(value);
    }
  }

  dequeue() {
    if (this.values.length > 0) {
      /* 入队大于出队情况下直接推出值 */
      const value = this.values.shift();
      return Promise.resolve(value);
    } else if (this.closed) {
      return Promise.resolve(AsyncQueue.EOS);
    } else {
      /* 在for/await循环中, 这里会首先调用, 创建待解决的期约. 有值入队后会直接解决该期约 */
      /* 理论上, 一个值入队, 便对应着一个待解决的期约 */
      return new Promise((resolve) => {
        this.resolvers.push(resolve);
      });
    }
  }

  close() {
    while (this.resolvers.length > 0) {
      this.resolvers.shift()(AsyncQueue.EOS);
    }
    this.closed = true;
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
}

/**
 * 构建一个事件流, 返回一个迭代器
 * @param {Element} elt
 * @param {*} type
 */
function eventStream(elt, type) {
  const q = new AsyncQueue();
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
