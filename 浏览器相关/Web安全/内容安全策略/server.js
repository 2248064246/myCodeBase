/*
 * @Author: huangyingli
 * @Date: 2022-01-01 23:53:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-02 00:07:35
 * @Description:
 */

//加载必须的模块
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

//定位静态目录的位置，根据请求找出对应的文件
function staticRoot(staticPath, req, res) {
  var pathObj = url.parse(req.url, true);

  if (pathObj.pathname === '/') {
    pathObj.pathname += 'index.html';
  }
  //读取静态目录里面的文件，然后发送出去
  var filePath = path.join(staticPath, pathObj.pathname);
  fs.readFile(filePath, 'binary', function (err, content) {
    if (err) {
      res.writeHead(404, 'Not Found');
      res.end('<h1>404 Not Found</h1>');
    } else {
      res.writeHead(200, 'Not Found');
      res.write(content, 'binary');
      res.end();
    }
  });
}
//创建服务器
var server = http.createServer(function (req, res) {
  // 加上了这个, 则script标签必须 设置nonce属性, 且值必须和服务器相同
  res.setHeader('Content-Security-Policy', "script-src 'unsafe-inline' 'nonce-2726c7f26c';")
  staticRoot(path.join(__dirname, '/'), req, res);
});
//监听8080端口
server.listen(8080);
console.log('http://localhost:8080');
