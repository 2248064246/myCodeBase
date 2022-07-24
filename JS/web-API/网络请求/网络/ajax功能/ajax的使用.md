# ajax 的使用

## 构建一个基本的 ajax

```JavaScript
let xhr = new XMLHttpRequest();

xhr.open('get', 'url');

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && /^2\d{2}$/g.test(xhr.status)) {
    // success
    console.log(xhr.responseText)
  }
};

xhr.send();
```

`open` 方法接受 3 个参数, 分别是 `method` `url` `async`, `async` 指定是否异步请求, 默认`true`

> mdn 规范建议原理同步 ajax, 这回严重导致不好的用户体验

除了使用 `onreadystatechange` 来获取服务端响应之外, 还可以使用 `onload` 事件

```JavaScript
/* 请求响应后就会触发, 无论响应状态码是什么 */
xhr.onload = function (ev) {
  if (/^2\d{2}$/g.test(xhr.status)) {
  }
};
```

ajax 属性摘要:

| 属性名          | 描述                                                                            |
| --------------- | ------------------------------------------------------------------------------- |
| readyState      | 请求状态(0: 还未请求; 1: 请求启动; 2: 收到响应头; 3: 正在接收数据; 4: 响应完成) |
| responseText    | 响应内容文本                                                                    |
| responseType    | (设置)响应内容类型(MIME)                                                        |
| responseURL     | 响应地址                                                                        |
| status          | 响应状态码                                                                      |
| statusText      | 响应状态文本                                                                    |
| timeout         | 超时设置, 单位 ms                                                               |
| withCredentials | [关于这个属性的作用查看](#withCredentials)                                      |

ajax 方法摘要:
| 方法名 | 描述 |
| ------------------------------- | ------------------------------------------ |
| open(method, url [, async]) | |
| send(data) | |
| abort() | 停止请求 |
| setRequestHeader(header, value) | 设置请求头 |
| overrideMimeType(mimeType) | 指定一个 MIME 类型用于替代服务器指定的类型 |
| getResponseHeader(header) | 获取响应头的值 |
| getAllResponseHeaders() | 获取所有响应头 |

ajax 事件摘要:

| 事件             | 描述                       |
| ---------------- | -------------------------- |
| onload           | 请求成功                   |
| onloadStart      | 请求发送                   |
| onloadEnd        | 请求结束(无论成功还是失败) |
| onerror          | 请求失败                   |
| abort            | 请求终止                   |
| timeout          | 请求超时                   |
| progress         | 数据传输中                 |
| readystatechange | readyState 变更            |

## timeout 设置

```JavaScript
xhr.timeout = 1000;
xhr.ontimeout = function () {
  console.log('超时了');
};
```

需要注意的是, 超时后请求会被直接失败, **但是只会触发 `ontimeout` 事件**

## 获取响应头

> 要获取所有的响应头, 需要服务端对应设置 `Access-Control-Expose-Headers`来允许获取更多响应头

## 设置请求头

```javascript
// 可以在请求头中设置一些控制类头部, 这需要服务端允许请求端能够这个头部(Access-Control-Allow-Headers)
xhr.setRequestHeader('Access-Control-Expose-Headers', '*');

// 这样做不太行, 必须由服务器设置
```

## 设置响应类型

通过 `responseType` 可以更改返回数据的类型

有以下可选值:

- text 默认
- '' 同 text
- blob 一个 Blob 对象(二进制数据)
- arraybuffer 一个 ArrayBuffer 对象(二进制数据)
- json

### text

默认模式

此模式下可以通过 `res.responseText` 获取响应值

### json

这种模式下, 只能通过 `res.response` 获取响应值, 并且获取到的是会是一个 JSON.parse 后的对象

```JavaScript
xhr.responseType = 'json'
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && /^2\d{2}$/g.test(xhr.status)) {
    // success
    // 获取后台发送回来的对象
    console.log(xhr.response);
  }
};
```

### blob

这个模式专门用来获取二进制文件

## 提交表单

一个 HTML 的 form 表单有以下四种方式:

- 使用 `post` 发送 enctype 为 `application/x-www-form-urlencoded` 的数据 (默认)
- 使用 `post` 发送 enctype 为 `multipart/form-data` 的数据
- 使用 `post` 发送 enctype 为 `text/plain` 的数据
- 使用 `get` 方法发送

使用 ajax 则不再限制与 form 表单的方法, 更加灵活更加强大(但是没了 form 表单的跨站特性)

使用 ajax 发送 `application/json` 格式数据

```js
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(JSON.stringify({ a: 123 }));
```

使用 ajax 发送 `multipart/form-data` 数据

```js
// 不需要指定 content-type, 会自动设置
let form = new FormData();
form.append('a', '123');
xhr.send(form);
```

使用 ajax 发送 `application/x-www-form-urlencoded` 数据

```js
let obj = { a: 123 };
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
function obj2search(obj, decode) {
  if (typeof obj !== 'object') return '';
  let searchAry = [];
  for (const key in obj) {
    let value = obj[key];
    value = typeof value === 'object' ? JSON.stringify(value) : value;
    let searchItem = key + '=' + (decode ? encodeURIComponent(value) : value);
    searchAry.push(searchItem);
  }
  return searchAry.join('&');
}
/* 需要将数组转为 查询字符串形式  */
xhr.send(obj2search(obj, true));
```

## 进度

在使用 ajax 获取文件/图片等的时候, 可以使用 `onpregress` 来获取进度

```js
xhr.onprogress = function (res) {
  console.log(res);
  console.log((res.loaded / res.total) * 100 + '%');
  // 在这里并不能通过这种方式将数据写入DOM
  // 并且此时 responseText 不清楚是从头到loaded 的数据还是分块的数据

  // document.body.innerHTML = ''
  // document.body.append(xhr.responseText)
};
```

## withCredentials {#withCredentials}

这是一个 Boolean 值, 用来在跨域请求时控制凭证(cookie, authorization 等)

为 true 时, 允许跨域请求`携带要请求网站的cookie`, 并且允许其响应设置 cookie.

例如: a.com 请求 b.com, 将会允许这个请求携带 b.com 的 cookie, 并且允许服务器设置 b.com 的 cookie

> 设置cookie需要注意 `SameSite` , 它需要设置为 `none` 并且还需要加上 `secure` 

```
res.setHeader('set-cookie', 'name=123; SameSite=none; Secure;')
```

这需要服务器设置 `Access-Control-Allow-Credentials` 为 true;

> 需要特别注意, 这种模式下服务器的 `Access-Control-Allow-Origin` 不能为 *;

