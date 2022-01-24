# Cache

Cache 接口为缓存的 Request / Response 对象提供存储机制.

Cache 接口像 workers 一样，是暴露在 window 作用域下的。尽管它被定义在 service worker 的标准中, 但是它不必一定要配合 service worker 使用.

除非明确地更新缓存，否则缓存将不会被更新；除非删除，否则缓存数据不会过期。

你需要定期地清理缓存条目，因为每个浏览器都硬性限制了一个域下缓存数据的大小。缓存配额使用估算值，可以使用 StorageEstimate API 获得。浏览器尽其所能去管理磁盘空间，但它有可能删除一个域下的缓存数据。浏览器要么自动删除特定域的全部缓存，要么全部保留。确保按名称安装版本缓存，并仅从可以安全操作的脚本版本中使用缓存

> Cache.put, Cache.add 和 Cache.addAll 只能在 GET 请求下使用

> 自 Chrome 46 版本起，Cache API 只保存安全来源的请求，即那些通过 HTTPS 服务的请求。

> Cache API 不支持 HTTP 缓存头。

> web worker 中可用

## 方法

request 为 Request 对象或者一个 URL

options:

- ignoreSearch: Boolean 是否忽略查询参数, 默认 false
- ignoreMethod: Boolean 是否阻止验证请求方法, 默认 false
- ignoreVary: 不明白什么意思?? , 默认 false

- match(request, options)
  - 返回一个 该 Promise 解析为与 Cache 对象中第一个匹配请求关联的 Response。如果没有找到匹配，Promise 解析为 undefined。
- matchAll(request, options)
  - 返回一个 Promise，该 Promise 解析为 Cache 对象中所有匹配响应的数组。
- add(request)
  - 方法接受一个 URL，检索它，并将结果响应对象添加到给定的缓存中。
  ```js
  // 等同于
  fetch(url).then(function (response) {
    if (!response.ok) {
      throw new TypeError('bad response status');
    }
    return cache.put(url, response);
  });
  ```
- addAll(requests)
  - 和add不同的是, 它接收一个url数组
- put(request, response)
  - 将请求的数据写入缓存
- delete(request, options)
  - 删除Cache条目并返回一个解析为true的Promise。如果没有找到缓存条目，则解析为false。
- keys(request, options)
