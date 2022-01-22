/*
 * @Author: huangyingli
 * @Date: 2022-01-22 16:34:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-22 17:27:35
 * @Description:
 */
let express = require('express');

const app = express();

app.all('*', (req, res, next) => {
  /* 跨域处理 */
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

const sse = (event, data) => {
  /* 数据格式 */
  return `event:${event}\ndata: ${data}\n\n`;
  //    return stream.write(`event:${ event }\ndata: ${ JSON.stringify(data) }\n\n`);
};

app.get('/', (req, res) => {
  let i = 0;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.write(sse('message', 'hello world'));

  setInterval(() => {
    console.log(i);
    res.write(sse('message', i++));
  }, 1000);
});

app.listen(8900, () => {
  console.log('示例应用正在监听 8900 端口!');
});
