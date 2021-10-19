
# Cookie

cookie 是浏览器为特定网页或网站保存的少量命名数据. 

cookie 是为服务端编程而设计的, 在最低的层级上作为http协议的扩展实现. 

cookie 数据会自动在浏览器与web服务器之间传输, 因此服务器端脚本可以读写存储在客户端的cookie值


## 为什么叫cookie

cookie 这个名字是有先例的, 在历史中, `cookie`或者`magic cookie` 曾被用于指代一小段数据, 特别是某种特殊或保密的数据, 可以证明身份或者授权访问.

## Cookie 操作

cookie 的API非常古老, 没有设计方法. 所有查询, 修改, 新增都是通过读写 document.cookie 实现的.


## cookie 生命周期和作用域

cookie 的默认生命周期很短, 存储的值只在浏览器会话期间, 用户退出浏览器之后就会丢失. 

不过可以给cookie指定生命周期(使用 max-age 属性), 浏览器将把cookie存储在一个文件中, 等时间到了再删除

cookie 的作用域由文档来源决定, 但也由文档路径决定(换句话说, cookie的作用域通过 path 和 domain 共同决定)

默认情况下cookie关联着**创建它的网页, 以及与该网页位于相同目录和子目录下的其他网页**, 这些网页都可以访问这个cookie

例如 a.b.com/cat/index.html 创建了一个 `cookie`, a.b.com/cat/x.html 可以访问, a.b.com/cat/dog/index.html 同样可以访问, 但是 a.b.com/index.html 就不能访问

我们可以通过给cookie指定`path`属性, 修改cookie的作用域,  如果在 a.b.com/cat/x.html 设置cookie路径为 `/dog`, 那么在 a.b.com/dog/other.html 下也可以访问, 如果设置为 `/`, 则整个域下可互相访问

同样可以 `domain` 属性, 在设置跨子域共享(适用于大网站, 拥有多个子域名的网站), 例如在 a.c.com 设置cookie, 设置domain为 `.c.com`, 则在 b.c.com 下页面访问这个cookie

cookie 还有一个 `secure`属性, Boolean 值, 为 true 的情况下, cookie 只能通过 https 协议传输

## Cookie 的限制

实践中, 浏览器允许超过 300 个cookie, 每个cookie限制 4KB(部分浏览器设置, 实际上并没有协议规定)

## 存储Cookie

cookie 的 值中不能有 `分号, 逗号, 空格`(这些符号有特殊含义)
```js
document.cookie = 'version=xxx' // 值指的是 version 的值
```

要给cookie添加多个属性需要用 `;` 分隔


