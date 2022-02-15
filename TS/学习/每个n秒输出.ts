/*
 * @Author: huangyingli
 * @Date: 2022-02-15 17:50:50
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-15 18:00:37
 * @Description:
 */

class Emitter {
  maxIdx: number;
  asyncIdx: number;
  interval: number;
  constructor(maxIdx: number, interval: number = 1000) {
    this.maxIdx = maxIdx;
    this.asyncIdx = 0;
    this.interval = interval;
  }

  async *[Symbol.asyncIterator]() {
    while (this.asyncIdx < this.maxIdx) {
      yield new Promise((resolve) => {
        setTimeout(resolve, this.interval, this.asyncIdx++);
      });
    }
  }
}


async function test2() {
  let emitter = new Emitter(10);

  console.log(emitter)
  for await (const value of emitter) {
    console.log(value)
  }
}

test2()
