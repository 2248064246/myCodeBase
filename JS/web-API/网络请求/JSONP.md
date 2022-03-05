# JSONP

JSONP(JSON with padding) 就是将 JSON 数据填充进函数, 通过 script 标签达到数据的跨域访问

## 实现原理

script 可以加载跨域脚本并执行, 所以可以在这个脚本返回这样的数据

```js
callback({ message: 'success' });
```

在本地定义一个 callback 函数

```js
function callback(data) {}
```

script 脚本加载的脚本会直接执行本地定义的函数, 并且将 JSON 数据写入函数参数, 这就是 JSON-P


