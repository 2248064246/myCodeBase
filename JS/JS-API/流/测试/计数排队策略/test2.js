/*
 * @Author: huangyingli
 * @Date: 2022-02-23 18:06:52
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-23 18:12:22
 * @Description:
 */
const writableStream = new WritableStream(
  {
    start(controller) {
      console.log('[start]');
    },
    async write(chunk, controller) {
      console.log('[write]', chunk);
      // 等待下一个写入。
      await new Promise((resolve) =>
        setTimeout(() => {
          document.body.textContent += chunk;
          resolve();
        }, 1_000)
      );
    },
    close(controller) {
      console.log('[close]');
    },
    abort(reason) {
      console.log('[abort]', reason);
    },
  },
  new CountQueuingStrategy({ highWaterMark: 10 })
);

(async () => {
  const writer = writableStream.getWriter();
  const start = Date.now();
  for (const char of 'abcdefghijklmnopqrstuvwxyz') {
    // 等待添加到写入队列。
    await writer.ready;
    console.log('[ready]', Date.now() - start, 'ms');
    // 写入完成后对 Promise 进行解析。
    writer.write(char);
  }
  await writer.close();
})();
