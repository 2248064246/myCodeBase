/*
 * @Author: huangyingli
 * @Date: 2022-02-07 11:09:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-07 15:20:53
 * @Description:
 */
/*
 * @Author: huangyingli
 * @Date: 2022-01-22 16:34:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-22 17:27:35
 * @Description:
 */
let express = require('express');
const webpush = require('web-push');

const app = express();

app.all('*', (req, res, next) => {
  /* 跨域处理 */
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, X-Requested-By, If-Modified-Since, X-File-Name, X-File-Type, Cache-Control, Origin'
  );

  next();
});

const sse = (event, data) => {
  /* 数据格式 */
  return `event:${event}\ndata: ${data}\n\n`;
  //    return stream.write(`event:${ event }\ndata: ${ JSON.stringify(data) }\n\n`);
};

// app.get('/', (req, res) => {
//   let i = 0;
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.write(sse('message', 'hello world'));

//   setInterval(() => {
//     console.log(i);
//     res.write(sse('message', i++));
//   }, 1000);
// });

app.post('/sub', (req, res) => {
  req.on('data', (data) => {
    let sub = JSON.parse(data.toString());

    const payload = {
      title: '一篇新的文章',
      body: '点开看看吧',
      icon: '/html/app-manifest/logo_512.png',
      data: { url: 'https://www.rrfed.com' },
      //badge: '/html/app-manifest/logo_512.png'
    };
    console.log(sub);
    webpush
      .sendNotification(sub, JSON.stringify(payload), {
        gcmAPIKey: 'AIzaSyCMcXhToaMbt4ss0yZivoFAyMP1ypYVUbM',
        vapidDetails: {
          subject: 'mailto:2248064246@qq.com',
          publicKey:
            'BHOTmPQ2g07abRvtXhKDpfPizDOtSSnsHd4IaV8l3Pig5elrGCqYEcroxs7NR7Ib8hcMFt8omYRDWXEywXt196k',
          privateKey: 'krwW6R8Cd6bFjctpprZXVP5n1UEvd74RLYk8Ho6nG9I',
        },
      })
      .then((isExecuted) => {})
      .catch((err) => {
        console.warn('错误信息', err);
      });

    setTimeout(() => {
      webpush
        .sendNotification(sub, JSON.stringify(payload), {
          gcmAPIKey: 'AIzaSyCMcXhToaMbt4ss0yZivoFAyMP1ypYVUbM',
          vapidDetails: {
            subject: 'mailto:2248064246@qq.com',
            publicKey:
              'BHOTmPQ2g07abRvtXhKDpfPizDOtSSnsHd4IaV8l3Pig5elrGCqYEcroxs7NR7Ib8hcMFt8omYRDWXEywXt196k',
            privateKey: 'krwW6R8Cd6bFjctpprZXVP5n1UEvd74RLYk8Ho6nG9I',
          },
        })
        .then((isExecuted) => {})
        .catch((err) => {
          console.warn('错误信息', err);
        });
    }, 4000);
  });
});

app.listen(8900, () => {
  console.log('示例应用正在监听 8900 端口!');
});
