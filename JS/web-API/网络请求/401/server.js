/*
 * @Author: huangyingli
 * @Date: 2022-06-18 21:27:01
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-06-19 00:36:47
 * @Description:
 */
const express = require('express');
const basicAuth = require('basic-auth');

const app = express();
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/', function (req, res) {
  console.log(req);
  // console.log(data.toString());
  res.setHeader('www-authenticate', 'basic  realm="GGbone",');
  res.status(401);
  const credentials = basicAuth(req);
  console.log(credentials);
  if (credentials && credentials.name === 'ggbone') {
    res.status(200);
    res.send('授权成功');
  } else {
    res.send('需要授权');
  }
});

app.listen(8088, function () {
  console.log('http://localhost:8088');
});
