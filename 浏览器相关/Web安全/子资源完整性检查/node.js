/*
 * @Author: huangyingli
 * @Date: 2021-12-29 23:55:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-29 23:59:42
 * @Description:
 */
const crypto = require('crypto');
const fs = require('fs');

start();

async function start() {
  const hash256 = await createFileHash256(); //异步
  // const hash256Sync = createFileHash256Sync() //同步
  console.log(hash256);
  // console.log(hash256Sync)
}

function createFileHash256() {
  //从文件创建一个可读流
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream('./test.js');
    const fsHash = crypto.createHash('sha384');

    stream.on('data', function (d) {
      fsHash.update(d);
    });

    stream.on('end', function () {
      const base64 = fsHash.digest('base64');
      resolve(base64);
    });
  });
}
