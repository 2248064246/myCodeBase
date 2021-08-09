

# HTTP keep-alive

HTTP 的 connection: keep-alive 是为了解决性能问题而产生的

HTTP 作为一个应用层协议, 性能很大程度上取决于 TCP通道的性能, 而 keep-alive 就是HTTP对TCP通道性能优化的一种策略

## 影响HTTP高并发时性能的因素

### 建立 TCP连接的网络延时

HTTP事务主要的连接、传输以及处理时延。
![请求发送建立TCP连接](https://img-blog.csdnimg.cn/20190124110842415.jpg)

很多时候, 服务器处理事务所花费的时间并不长, TCP的连接占用了绝大部分时间

如果这个请求串联多个, 这种延时将会被进一步放大

![串联请求](https://img-blog.csdnimg.cn/20190129174754955.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RhYnJpc19r,size_16,color_FFFFFF,t_70)

## 解决方案

### HTTP/1.1持久连接 (即 keep-alive)

持久连接在默认情况下都是支持的。除非特别指明，否则HTTP/1.1假定所有连接都是持久的。如果客户端需要事务处理完之后直接关闭TCP连接，需要显式地添加一个Connection: close首部。同样如果服务器返回的首部中没有Connection: close首部，客户端会认为连接仍维持在打开状态。

### 管道化连接

