/*
 * @Author: huangyingli
 * @Date: 2022-06-18 21:27:01
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-05 15:42:27
 * @Description:
 */
const express = require('express');
const path = require('path');
const fs = require('fs')

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
  // console.log(req);
  res.status(200);
  res.setHeader('set-cookie', 'name=123; SameSite=none; Secure=false;');
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./a.html', function(err, data) {
    res.send(data);
  })
 
});

app.post('/xxx', function(req, res) {
  // console.log(req)
  req.on('data', function() {
    console.log(req.headers.cookie)
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send('ok')
  })
})

app.listen(8088, function () {
  console.log('http://localhost:8088');
});
