# Service Worker API

Service worker 本质上冲当 WEB 应用程序、浏览器和网络之间的代理服务器。

这个 API 旨在创建有效的离线体验，它会拦截网络请求并根据网络是否可用来采取适当的动作、更新来自服务器的的资源。它还提供入口以推送通知和访问后台同步 API。

> 这是一个用来旨在更好的控制缓存的 API, 比 App Cache 控制更加精细

- 运行在 worker 上下文, 不能访问 DOM.
- 设置完全同步, 同步 API 不能在里面工作
- 只允许 HTTPS 模式下运行

## 使用场景

- 后台同步数据
  - 启动一个 service worker 即使没有用户访问特定站点，也可以更新缓存
- 响应来自其它源的资源请求
- 集中接收计算成本高的数据更新, 这样多个页面可以利用同一组数据
- 在客户端进行 LESS, CJS/AMD 等模块编译和依赖管理
- 后台服务钩子
- 自定义模板用于特定 URL 模式
- 性能增强, 比如预取用户可能需要的资源, 比如相册中的后面几张图片
- 响应推送
  - 启动一个 service worker 向用户发送一条信息通知新的内容可用

## 使用

### 生命周期

1. 下载
2. 安装
3. 激活

### 基本架构

1. 获取和注册 service worker, 通过 serviceWorkerContainer.register()
2. 如果注册成功，service worker 就在 ServiceWorkerGlobalScope 环境中运行
3. service worker 现在可以处理事件了
4. 受 service worker 控制的页面打开后会尝试去安装 service worker。最先发送给 service worker 的事件是安装事件(在这个事件里可以开始进行填充 IndexDB 和缓存站点资源)。这个流程同原生 APP 或者 Firefox OS APP 是一样的 — 让所有资源可离线访问。
5. 当 oninstall 事件的处理程序执行完毕后，可以认为 service worker 安装完成了。
6. 下一步是激活。当 service worker 安装完成后，会接收到一个激活事件(activate event)。 onactivate 主要用途是清理先前版本的 service worker 脚本中使用的资源。
7. Service Worker 现在可以控制页面了，但仅是在 register() 成功后的打开的页面。也就是说，页面起始于有没有 service worker ，且在页面的接下来生命周期内维持这个状态。所以，页面不得不重新加载以让 service worker 获得完全的控制。

![service worker lifecycle](https://mdn.mozillademos.org/files/12636/sw-lifecycle.png)

**service worker 支持的事件**

![service worker events](https://mdn.mozillademos.org/files/12632/sw-events.png)

### 注册问题

> 在同一个 Origin 下，我们可以注册多个 Service Worker。但是请注意，这些 Service Worker 所使用的 scope 必须是不相同的。

**注册失败可能原因**

- 非安全上下文
- service worker 文件的地址没有写对 -- 需要相对于 origin , 而不是 app 的根目录。在我们的例子例， service worker 是在 https://mdn.github.io/sw-test/sw.js，app 的根目录是 https://mdn.github.io/sw-test/。应该写成 /sw-test/sw.js 而非 /sw.js.
- service worker 在不同的 origin 而不是你的 app 的，这是不被允许的。

### 抓取

> 每次任何被 service worker 控制的资源被请求到时，都会触发 fetch 事件，这些资源包括了指定的 scope 内的文档，和这些文档内引用的其他任何资源（比如 index.html 发起了一个跨域的请求来嵌入一个图片，这个也会通过 service worker 。）

**注意**

- service worker 只能抓取在 service worker scope 里从客户端发出的请求。

### 更新

在默认情况下，Service Worker 必定会每 24 小时被下载一次，如果下载的文件是最新文件，那么它就会被重新注册和安装，**但不会被激活**，当不再有页面使用旧的 Service Worker 的时候，它就会被激活。

### 信息通讯

1. 使用 `postMessage`

从页面到 service worker

```js
navigator.serviceWorker.controller.postMessage();

/* 对于注册了多个 service worker 的页面来说 */
navigator.serviceWorker
  .register('./sw.js', { scope: './sw' })
  .then(function (reg) {
    /* 可以使用这种方法 */
    reg.active.postMessage('this message is from page, to sw');
  });

/* service worker 中监听事件 */
self.addEventListener('message', function (event) {
  console.log(event.data); // this message is from page, to sw
});
```

从 service worker 到页面

```js
/* service worker 中 */
self.addEventListener('message', function (event) {
  event.source.postMessage('this message is from sw.js, to page');
});

/* 页面中 */
navigator.serviceWorker.addEventListener('message', function (e) {
  console.log(e.data); // this message is from sw.js, to page
});

/* 对于多个 service worker 中的页面,  */
navigator.serviceWorker
  .register('./sw.js', { scope: './sw' })
  .then(function (reg) {
    /* 可以使用这种方法 */
    reg.active.addEventListener('message', func);
  });
```

service worker 互相通信 (同 origin)

```js
self.clients.matchAll().then((client) => {
  client[0].postMessage('this message is from sw.js, to page');
});
```

2. 使用 channelMessage API
3. 使用 BroadcastChannel API
