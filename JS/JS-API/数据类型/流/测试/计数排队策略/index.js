/*
 * @Author: huangyingli
 * @Date: 2022-02-23 17:37:09
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-23 18:01:54
 * @Description:
 */

const decoder = new TextDecoder('utf-8');
const encoder = new TextEncoder();
const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 5 });

const { writable, readable } = new TransformStream(
  {
    start(controller) {
      console.log('start');
    },
    transform(chunk, controller) {
      // 只有read 才会转换
      return new Promise((resolve) => {
        setTimeout(resolve, 1000, decoder.decode(chunk, { stream: true }));
      }).then((res) => {
        controller.enqueue(res);
      });
    },
  },
  queuingStrategy,
  new CountQueuingStrategy({ highWaterMark: 5 })
);

const readableStreamDefaultReader = readable.getReader();
const writableStreamDefaultWriter = writable.getWriter();

// 消费者
(async function () {
  while (true) {
    const { done, value } = await readableStreamDefaultReader.read();
    if (done) {
      break;
    } else {
      console.log(value);
      console.log('xxx');
    }
  }
})();
// 生产者
(async function () {
  for (let chunk of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    // await writableStreamDefaultWriter.ready;
    console.log('chunk', chunk);
    writableStreamDefaultWriter.write(encoder.encode(chunk, { stream: true }));
  }
  //  writableStreamDefaultWriter.close();
})();
