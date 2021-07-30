/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-07-28 15:00:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-28 15:24:25
 * @Description: 
 */
async function* ints() {
  // 每 1000 毫秒生成一个递增的整数
  for (let i = 0; i < 2; ++i) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}
const {
  writable,
  readable
} = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2);
  }
});
const readableStreamDefaultReader = readable.getReader();
const writableStreamDefaultWriter = writable.getWriter();
// 消费者
(async function () {
  while (true) {
    const {
      done,
      value
    } = await readableStreamDefaultReader.read();
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
  for await (let chunk of ints()) {
    await writableStreamDefaultWriter.ready;
    writableStreamDefaultWriter.write(chunk);
  }
  //  writableStreamDefaultWriter.close();
})();