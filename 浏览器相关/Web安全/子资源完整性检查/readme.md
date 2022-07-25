# 子资源完整性价差

此功能允许浏览器检查获得的资源是否被篡改, 如果被改动过, 则不会加载此资源

现在大多数网站通过将资源放在 CDN(内容分发网络)上来加快访问速度, 节约带框, 减少网络攻击.

使用 CDN 也存在风险，如果攻击者获得对 CDN 的控制权，则可以将任意恶意内容注入到 CDN 上的文件中 （或完全替换掉文件)，因此可能潜在地攻击所有从该 CDN 获取文件的站点。

子资源完整性通过确保 Web 应用程序获得的文件未经第三方注入或其他任何形式的修改来降低这种攻击的风险。

## 如何使用

通过 script 或 link 标签的 integrity 属性

integrity 分为两个部分, 第一部分指定哈希值生成的算法(支持 sha256, sha384, sha512), 第二部分是经过 base64 编码的实际哈希值, 两者之间通过 '-' 连接

> integrity 值可以包含多个由空格分隔的哈希值，只要文件匹配其中任意一个哈希值，就可以通过校验并加载该资源。

```html
<script
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
></script>
```

## 内容安全策略及子资源完整性

可以根据内容安全策略来配置你的服务器使得指定类型的文件遵守 SRI。这是通过在 CSP 头部添加 require-sri-for 指令实现的：

```
Content-Security-Policy: require-sri-for script;
```

> 这条指令规定了所有 JavaScript 都要有 integrity 属性，且通过验证才能被加载。



### 额外

如果设置了`Content-Security-Policy`, 但是没有指定 `unsafe-eval` 则此类函数无法运行(包括 Function 和 eval)

```json
可以运行不安全函数
Content-Security-Policy: script-src 'self' 'unsafe-eval'