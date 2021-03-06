# Server-sent event

通过这个 API, 服务器可以在任何时刻向 web 页面推送数据 (这样不需要使用 websocket 了)

> websocket 是支持双向通信的, 并且支持IE10, SSE不支持IE, 并且只能服务器发送给客户端

> 这也是一个 web 即时通讯的技术之一

> web workers 中可用

## 使用

在 Web 应用程序中使用服务器发送事件很简单.在服务器端,只需要按照一定的格式返回事件流,在客户端中,只需要为一些事件类型绑定监听函数,和处理其他普通的事件没多大区别.

在客户端使用 `EventSource` API 来实现这个功能

```js
const evtSource = new EventSource('url');
```

连接事件, 只有下面两个链接事件是固定的(后台可以定义事件)

- error
- open

> 特别注意: 当不通过 HTTP / 2 使用时，SSE（server-sent events）会受到最大连接数的限制，这在打开各种选项卡时特别麻烦，因为该限制是针对每个浏览器的，并且被设置为一个非常低的数字（6）。该问题在 Chrome 和 Firefox 中被标记为“无法解决”。此限制是针对每个浏览器+域的，因此这意味着您可以跨所有选项卡打开 6 个 SSE 连接到www.example1.com，并打开6个SSE连接到www.example2.com。 （来自 Stackoverflow）。使用 HTTP / 2 时，HTTP 同一时间内的最大连接数由服务器和客户端之间协商（默认为 100）。

**服务器设置**

```js
header('Content-Type: text/event-stream');

/* 如果跨域还需设置其他的, 具体看示例 */
```

## SSE 数据帧的格式

event-source 必须编码成 utf-8 的格式，消息的每个字段使用"\n"来做分割，并且需要下面 4 个规范定义好的字段：

- event: 事件类型
- data: 发送的数据
- id: 每一条事件流的 ID
- retry： 告知浏览器在所有的连接丢失之后重新开启新的连接等待的时间，在自动重新连接的过程中，之前收到的最后一个事件流 ID 会被发送到服务端

> 除了上面规定的字段名,其他所有的字段名都会被忽略.

> 具体看示例
