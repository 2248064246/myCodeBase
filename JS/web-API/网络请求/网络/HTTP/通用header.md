

# 通用首部

指的是可以应用于请求和响应中, 但是不能应用于消息内容自身的 HTTP 首部 ?? 这句话作何解释??

通用首部可以是 `响应头部` 或者 `请求头部`, 但是不可以是 `实体头部`

# 常见通用首部

+ Date
  + 使用的是 GMT(格林尼治标准时间) 时间
  + 例如: Date: Wed, 21 Oct 2015 07:28:00 GMT 
  + 一般出现在响应头里面
+ Cache-Control
  + 通知服务器到客户端的所有缓存机制, 表示资源是否可以缓存, 以及缓存有效时间(单位 秒)
  + 浏览器的默认缓存时间是: `（访问时间 - 该文件的最后修改时间） ÷ 10`
  + 缓存机制
  + 指令 (多个指令之间用 ',' 分隔)
    + 缓存请求指令(客户端可以在HTTP请求中使用的标准 Cache-Control 指令。)
      + `max-age<seconds>`
      + `max-stale[<seconds>]`
        + 表明客户端愿意接收一个已经过期的资源。
        + 可以设置一个可选的秒数，表示响应不能已经过时超过该给定的时间。
      + `min-fresh<seconds>`
      + `no-cache`
      + `no-store`
      + `no-transform`
      + `only-if-cached`
    + 缓存响应指令 (服务器可以在响应中使用的标准 Cache-Control 指令。)
      +  `must-revalidate`
      +  `no-cache`
         +  在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)。
      +  `no-store`
         +  缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。
      +  `no-transform`
      +  `public`
         +  表明响应可以被任何对象(客户端, 代理服务器, 等等)缓存, 即使是通常不可缓存的内容(例如: 该响应没有 `max-age`指令或者 `Expires`消息头; 该请求是`post`请求)
      +  `private`
         +  表明响应只能被单个用户缓存(浏览器客户端), 不能作为共享缓存
      +  `proxy-revalidate`
      +  `max-age<secondes>`
         +  请求缓存后的X秒不再发起请求
         +  设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。与Expires相反，**时间是相对于请求的时间**。
      +  `s-maxage<seconds>`
         +  覆盖max-age或者Expires头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它。
+ Connection
  + 决定当前的事务完成后, 是否会关闭网络连接
  + HTTP/1.1 的请求默认使用一个持久连接
  + 更多查看 `HTTP keep-alive` 详解
+ Transfer-Encoding
  + WEB 服务器表明自己对本响应消息体（不是消息体里面的对象）作了怎样的编码，比如是否分块（chunked），例如：Transfer-Encoding: chunked
+ Via
  +  是由代理服务器添加的，适用于正向和反向代理，在请求和响应首部中均可出现
  +  当客户端请求到达第一个代理服务器时，该服务器会在自己发出的请求里面添加 Via 头部，并填上自己的相关信息，当下一个代理服务器 收到第一个代理服务器的请求时，会在自己发出的请求里面复制前一个代理服务器的请求的Via头部，并把自己的相关信息加到后面，以此类推，当 服务器 收到最后一个代理服务器的请求时，检查 Via 头部，就知道该请求所经过的路由。
  

## 额外的关于 Access-Control-Expose-Headers

响应首部 Access-Control-Expose-Headers 列出了哪些首部可以作为响应的一部分暴露给外部。

默认情况下，只有七种 simple response headers（简单响应首部）可以暴露给外部：
+ Cache-Control
+ Content-Type
+ Content-Length
+ Content-Language
+ Expires
+ Last-Modified
+ Pragma

如果想要让客户端可以访问到其他的首部信息，可以将它们在 Access-Control-Expose-Headers 里面列出来。

`Access-Control-Expose-Headers: *`

