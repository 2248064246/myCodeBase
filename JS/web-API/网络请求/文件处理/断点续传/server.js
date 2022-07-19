/*
 * @Author: huangyingli
 * @Date: 2022-06-18 21:27:01
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-18 17:28:48
 * @Description:
 */
const express = require('express');
const fs = require('fs')

const formidable = require('express-formidable');

const app = express();

app.use(formidable());
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Accept-Ranges', 'bytes');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Expose-Headers', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/fileOne', function (req, res) {
  let range =  req.header('range')
  console.log(range)
  fs.readFile('../log_info.log', function(err, data)  {
    if(range) {
      let [start, end] = range.split('-')
      console.log(start, end)
      res.status(206);
      res.send(data.slice(start, end))
    }else {
      res.send(data)
    }
  })
  
});


app.listen(8088, function () {
  console.log('http://localhost:8088');
});
