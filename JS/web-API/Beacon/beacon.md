# Beacon API

此 API 用于将异步和非阻塞请求发送到服务器. 请求使用`http的post方法`, 此请求通常不需要响应. 这个请求被保证在页面的`unload`状态发起到完成前被完成, 并且不会阻塞页面.(也就是说关闭页面依旧能够向后台发送数据.)

## 用途

这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（unload）文档之前向 Web 服务器发送数据。

### 使用

```js
navigator.sendBeacon(url, data);
```

其中 data 可以是 `ArrayBuffer` `Blob` `FormData` `DomString` 等形式数据
