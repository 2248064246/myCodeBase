

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



+ 说明
  + 复用同一条TCP通道
  + Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间

### 管道化连接

在 `长连接`的基础上, HTTP1.1 进一步支持在持久连接上使用`管道化特性`, 这是相对于 keep-alive 的又一性能优化.

在响应到达服务器被处理之前, 可以将多个请求放入队列, 当第一条请求发往服务器的时候, 其余请求也可以开始发送, 不用等待前一条请求返回回来

### 请求对比
![对比](https://img-blog.csdnimg.cn/20190129183017661.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RhYnJpc19r,size_16,color_FFFFFF,t_70)


## HTTP 队首阻塞

简单理解就是需要排队，队首的事情没有处理完的时候，后面的人都要等着。
队头阻塞”与短连接和长连接无关，而是由 HTTP 基本的“请求 - 应答”机制所导致的。因为 HTTP 规定报文必须是“一发一收”，这就形成了一个先进先出的“串行”队列。
而http的队首阻塞，在管道化和非管道化下，表现是不同的


+ http1.0 
  + http1.0的队首组塞发生在客户端。
  + 必须等待前一个请求响应收到才会发送后续请求
+ http1.1 
  + 应用管道化技术后，http1.1的队首阻塞发生在服务器端。
  + 客户端可以同时发送多个响应, 但是只有队头响应被返回之后, 后续的响应才会返回

![队头阻塞](https://img-blog.csdnimg.cn/20200829153535184.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)

### 队头阻塞解决方法

+ 并发TCP连接
  + 对于一个域名而言，是允许分配多个长连接的，那么可以理解成增加了任务队列，也就是说不会导致一个任务阻塞了该任务队列的其他任务
  + Chrome中是6个，说明浏览器一个域名采用6个TCP连接，并发HTTP请求
+ 域名分片
  + 我们可以在一个域名下分出多个二级域名出来，而它们最终指向的还是同一个服务器，这样子的话就可以并发处理的任务队列更多，也更好的解决了队头阻塞的问题。
+ http2 多路复用
  + 对于HTTP1.1中管道化导致的请求/响应级别的队头阻塞，可以使用HTTP2的多路复用解决。
http2中将多个请求复用同一个tcp通道中，通过二进制分帧并且给每个帧打上流的 ID 去避免依次响应的问题，对方接收到帧之后根据 ID 拼接出流，这样就可以做到乱序响应从而避免请求时的队首阻塞问题
  + 当然，即使使用HTTP2, 仍可能出现TCP队头阻塞。

HTTP2 多路复用
![多路复用](https://img-blog.csdnimg.cn/20200829161234921.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)


## Keep-Alive模式下如何知道某一次数据传输结束

如果不是Keep-Alive模式，HTTP协议中客户端发送一个请求，服务器响应其请求，返回数据。服务器通常在发送回所请求的数据之后就关闭连接。这样客户端读数据时会返回EOF（-1），就知道数据已经接收完全了。
但是如果开启了 Keep-Alive模式，那么客户端如何知道某一次的响应结束了呢？


  + 如果是静态的响应数据，可以通过判断响应头部中的Content-Length 字段，判断数据达到这个大小就知道数据传输结束了
  + 但是返回的数据是动态变化的，服务器不能第一时间知道数据长度，这样就没有 Content-Length 关键字了。这种情况下，服务器是分块传输数据的，Transfer-Encoding：chunk，这时候就要根据传输的数据块chunk来判断，数据传输结束的时候，最后的一个数据块chunk的长度是0。
  

## HTTP keep-alive和TCP keepalive的区别

  TCP keepalive指的是TCP保活计时器（keepalive timer）。设想有这样的情况：客户已主动与服务器建立了TCP连接。但后来客户端的主机突然出故障。显然，服务器以后就不能再收到客户发来的数据。因此，应当有措施使服务器不要再白白等待下去。这就是使用保活计时器。服务器每收到一次客户的数据，就重新设置保活计时器，时间的设置通常是两小时。若两小时没有收到客户的数据，服务器就发送一个探测报文段，以后则每隔75秒发送一次。若一连发送10个探测报文段后仍无客户的响应，服务器就认为客户端出了故障，接着就关闭这个连接。

  针对linux系统，TCP保活超时时间、探测报文段发送间隔、探测报文段最大发送次数都是可以设置
