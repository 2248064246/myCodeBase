# 网络信息接口

提供系统的网络信息

此结构通过 `navigator.connection` 访问

- 检测连接更改(只能检测网络变动, 例如从 4g -> 3g, 无法检测网络是否断开)

```js
var connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;
var type = connection.effectiveType;

function updateConnectionStatus() {
  console.log(
    'Connection type changed from ' + type + ' to ' + connection.effectiveType
  );
  type = connection.effectiveType;
}

connection.addEventListener('change', updateConnectionStatus);
```

- 连接对象可用于决定是否预加载占用大量带宽或内存的资源

```js
let preloadVideo = true;
var connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if (connection) {
  if (connection.effectiveType === 'slow-2g') {
    preloadVideo = false;
  }
}
```
