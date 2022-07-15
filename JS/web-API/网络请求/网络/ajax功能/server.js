/*
 * @Author: huangyingli
 * @Date: 2022-06-18 21:27:01
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-15 10:49:24
 * @Description:
 */
const express = require('express');
const basicAuth = require('basic-auth');

const formidable = require('express-formidable');

const app = express();

app.use(formidable());
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Access-Control-Expose-Headers', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/xxx', function (req, res) {
  console.log(req.headers);
  res.status(200);
  res.setHeader('name', 'Johnny');
  res.send({ a: 123 });
});
app.get('/301', function (req, res) {
  res.status(301);
  res.send('请跳转');
});
app.get('/404', function (req, res) {
  res.status(404);
  res.send('报错了');
});
app.get('/timeout', function (req, res) {
  // res.status(404);
  // res.send('报错了');
});

app.post('/postJson', (req, res) => {
  console.log(req.fields);
    res.send('xxx');
});
app.post('/postFormData', (req, res) => {
  console.log(req.fields);
  res.send('xxx');
});
app.post('/postFormUrl', (req, res) => {
  console.log(req.fields);
  res.send('xxx');
});

app.listen(8088, function () {
  console.log('http://localhost:8088');
});
