# WebSocket

WebSockets 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此 API，您可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应

## 使用

```js
new WebSocket(url);
new WebSocket(url, protocols);
```

url: 需要以 `ws` 或 `wss` 开头
protocols: 这个不知道干嘛(默认是个空数组)


## 事件

+ open
+ close
+ message
+ error


## 方法

+ close()
+ send()
  + 允许发送的数据
    + USVString
    + ArrayBuffer
    + Blob
    + ArrayBufferView

