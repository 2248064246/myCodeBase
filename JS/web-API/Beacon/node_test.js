/*
 * @Author: huangyingli
 * @Date: 2021-11-22 11:30:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-13 17:29:13
 * @Description:
 */

const express = require('express');

const app = express();
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.post('/test_beacon', function (req, res) {
  req.on('data', function (data) {
    console.log(req.url);
    console.log(data.toString());
    res.send()
  });
});

app.listen(8088, function () {
  console.log('http://localhost:8088');
});
