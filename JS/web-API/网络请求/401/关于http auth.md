# http 身份验证

HTTP 提供一个用于权限控制和认证的通用框架。最常用的 HTTP 认证方案是 HTTP Basic authentication;

[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)

## 通用 http 认证框架

![](./HTTPAuth.png)

## 验证方案

### basic

这种验证方案, 浏览器中输入的用户名,密码会以 base64 编码形式被发送, 这个信息包含早 `authorization` 请求头中

此方案适用于所有浏览器

```js
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
```

这里返回 401 后, 会等待客户端输入用户名和密码

basicAuth 的作用等同于以下方法

```js
console.info(req.headers.authorization);
const buf = Buffer.from(
  req.headers.authorization.substring(
    req.headers.authorization.indexOf(' ') + 1
  ),
  'base64'
);
const authString = buf.toString('ascii');
const basicauth = authString.split(':');
console.info(basicauth);
```

### digest

这种方案只适用于 firefox 浏览器, 其他浏览器需要使用自己添加额外方式实现

服务器端

```javascript
res.setHeader('www-authenticate', 'digest  realm="GGbone"');

这里注意, 根据规范, 应该还需要服务器生成随机的 `nonce` 返回客户端
```

在 firefox 中输入用户名和密码之后, 会发送如下请求头

```
authorization: 'Digest username="ggbone", realm="GGbone", nonce="", uri="/", response="087cb0e5c537e7ba5e02de0d2ef90e6f"'
```

其中response的生成规则如下

```js
  let H1 = MD5(username + ':' + realm + ':' + password);
  let H2 = MD5(method + ':' + uri) // method 是大写的
  let response = MD5(H1 + ':' + nonce + ':' + H2)
```

在官方规范中还有一些其他字段, 那些字段如果没有可以不用输入 (nonce 是一定需要的, 即使为空)


### 