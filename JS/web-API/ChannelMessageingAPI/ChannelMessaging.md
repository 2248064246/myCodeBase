# ChannelMessaging

Channel Messaging API 允许**两个不同的脚本运行在同一个文档的不同浏览器上下文**（比如两个 iframe，或者文档主体和一个 iframe，使用 SharedWorker 的两个文档，或者两个 worker）来**直接通讯**，在每端使用一个端口（port）通过双向频道（channel）向彼此传递消息。


可以让运行在不同浏览器上下文中的独立脚本，连接到同一份文档（比如：两个 IFrame, 或者主文档和一个 IFrame, 或者使用同一个 SharedWorker 的两份文档），并直接通信，通过每端一个 port 的双向频道（或管道）在两者之间传递消息。

> 换个角度说，Message Channels 可以提供一个安全的通道让你在不同的浏览器上下文间传递数据。


## 概念和用法

使用` MessageChannel()` 构造函数来创建通讯信道。一旦创建，信道的两个端口即可通过` MessageChannel.port1` 和` MessageChannel.port2` 属性进行访问（都会返回 MessagePort  对象）。创建信道的应用程序使用 port1，在另一端的程序使用 port2 —— 你向 port2 发送信息，然后携带 2 个参数（需要传递的消息，要传递所有权的对象，在这里是 port 自身）调用 window.postMessage 方法将端口信息传递到另一个浏览器上下文。

当这些可传递的对象被传递后，他们就从之前所属的上下文中消失了。比如一个 port，一旦被发送，在原本的上下文中就再也不可用了。注意当前仅有 ArrayBuffer 和 MessagePort 对象可以被发送。

另一个浏览器上下文可以使用 `MessagePort.onmessage` 监听信息，并使用事件的 data 属性获取消息内容。你可以通过 `MessagePort.postMessage` (en-US) 向原来的文档发送应答消息。

当你想要停止通过信道发送消息时，你可以调用来关闭` MessagePort.close` (en-US) 端口。

使用参考文档 (https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API/Using_channel_messaging)