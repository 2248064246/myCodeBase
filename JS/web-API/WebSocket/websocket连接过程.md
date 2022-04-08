# websocket 连接过程

webSocket 是一个持久化协议，webSocket 是基于 HTTP 协议的，或者说 借用 HTTP 的协议来完成一部分握手。

websocket 的连接建立过程:
1、客户端发送 GET 请求， upgrade
2、服务器给客户端 switching protocol
3、就进行了 webSocket 的通信了

首先客户端发送 GET 请求, 表明要转换的协议
`Upgrade: websocket`
`Connection: Upgrade`
这两个就告诉服务器，我要发起 websocket 协议，我不是 HTTP

服务器接收后, 返回 `101 (Switching Protocol)`

websocket 协议就建立了了
