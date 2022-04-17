# HTTP Cookie

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，**它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上**。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。**Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能**。

Cookie 主要用于一下三个方面:

- 会话状态管理
- 个性化设置
- 浏览器行为跟踪(如跟踪分析用户行为)

Cookie 曾一度用于客户端数据的存储，因当时并没有其它合适的存储办法而作为唯一的存储手段，但现在随着现代浏览器开始支持各种各样的存储方式，Cookie 渐渐被淘汰。浏览器的每次请求都会携带 Cookie 数据，会带来额外的性能开销（尤其是在移动环境下）。

## 创建 Cookie

- 通过响应头的 `set-Cookie`
- 通过 JS 的 CookieAPI 写入

## 定义 Cookie 的生命周期

Cookie 的生命周期可以通过两种方式定义：

- 会话期 Cookie 是最简单的 Cookie：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期 Cookie 不需要指定过期时间（Expires）或者有效期（Max-Age）。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留下来，就好像浏览器从来没有关闭一样，这会导致 Cookie 的生命周期无限期延长。
- 持久性 Cookie 的生命周期取决于过期时间（Expires）或有效期（Max-Age）指定的一段时间。

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

> 提示：当 Cookie 的过期时间被设定时，设定的日期和时间只与客户端相关，而不是服务端。

如果您的站点对用户进行身份验证，则每当用户进行身份验证时，它都应重新生成并重新发送会话 Cookie，甚至是已经存在的会话 Cookie。此技术有助于防止**会话固定攻击**（session fixation attacks） (en-US)，在该攻击中第三方可以重用用户的会话。

## 限制访问 Cookie

有两种方法可以确保`Cookie`被安全发送, 且不会被意外的参与者或脚本访问: `Source属性和HttpOnly属性`

标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端，因此可以预防 `中间人攻击`。但即便设置了 Secure 标记，敏感信息也不应该通过 Cookie 传输，因为 Cookie 有其固有的不安全性，Secure 标记也无法提供确实的安全保障, 例如，**可以访问客户端硬盘的人可以读取它**。

> 从 Chrome 52 和 Firefox 52 开始，不安全的站点（http:）无法使用 Cookie 的 Secure 标记。

JavaScript Document.cookie API **无法访问带有 HttpOnly 属性的 cookie**；此类 Cookie 仅作用于服务器。例如，持久化服务器端会话的 Cookie 不需要对 JavaScript 可用，而应具有 HttpOnly 属性。此预防措施有助于缓解跨站点脚本（XSS） (en-US)攻击。

## Cookie 的作用域

Domain 和 Path 标识定义了 Cookie 的作用域：即允许 Cookie 应该发送给哪些 URL。

Domain 指定了哪些主机可以接受 Cookie。如果不指定，默认为 origin，不包含子域名。如果指定了 Domain，则一般包含子域名。因此，指定 Domain 比省略它的限制要少。但是，当子域需要共享有关用户的信息时，这可能会有所帮助。

例如，如果设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如 developer.mozilla.org）。

**Path 属性**

Path 标识指定了主机下的哪些路径可以接受 Cookie（该 URL 路径必须存在于请求 URL 中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配。

例如，设置 Path=/docs，则以下地址都会匹配：

- /docs
- /docs/a
- /docs/a/c

## SameSite 属性

SameSite Cookie 允许服务器要求某个 cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。

SameSite cookies 是相对较新的一个字段，所有主流浏览器都已经得到支持。

```
Set-Cookie: key=value; SameSite=Strict
```

SameSite 可以有下面三种值：

- None。浏览器会在同站请求、跨站请求下继续发送 cookies，不区分大小写。
- Strict。浏览器将只在访问相同站点时发送 cookie。（在原有 Cookies 的限制条件上的加强，如上文 “Cookie 的作用域” 所述）
- Lax。与 Strict 类似，但用户从外部站点导航至 URL 时（例如通过链接）除外。 在新版本浏览器中，为默认选项，Same-site cookies 将会为一些跨站子请求保留，如图片加载或者 frames 的调用，但只有当用户从外部站点导航到 URL 时才会发送。如 link 链接

> 以前，如果 SameSite 属性没有设置，或者没有得到运行浏览器的支持，那么它的行为等同于 None，Cookies 会被包含在任何请求中——包括跨站请求。

> 大多数主流浏览器正在将 SameSite 的默认值迁移至 Lax。如果想要指定 Cookies 在同站、跨站请求都被发送，现在需要明确指定 SameSite 为 None。

## Cookie 前缀

作为深度防御措施，可以使用 cookie 前缀来断言有关 cookie 的特定事实。有两个前缀可用：

- \_\_Host-
  如果 cookie 名称具有此前缀，则仅当它也用 Secure 属性标记，是从安全来源发送的，不包括 Domain 属性，并将 Path 属性设置为 / 时，它才在 Set-Cookie 标头中接受。这样，这些 cookie 可以被视为 "domain-locked”。
- \_\_Secure-
  如果 cookie 名称具有此前缀，则仅当它也用 Secure 属性标记，是从安全来源发送的，它才在 Set-Cookie 标头中接受。该前缀限制要弱于 \*\*Host- 前缀。

带有这些前缀点 Cookie， 如果不符合其限制的会被浏览器拒绝。请注意，这确保了如果子域要创建带有前缀的 cookie，那么它将要么局限于该子域，要么被完全忽略。由于应用服务器仅在确定用户是否已通过身份验证或 CSRF 令牌正确时才检查特定的 cookie 名称，因此，这有效地充当了针对会话劫持的防御措施。

## 安全

- 回话劫持
- xss
- 跨站点请求伪造(CSRF)

## 跟踪和隐私

### 第三方 Cookie

Cookie 与域关联。如果此域与您所在页面的域相同，则该 cookie 称为第一方 cookie（ first-party cookie）。如果域不同，则它是第三方 cookie（third-party cookie）


### 僵尸Cookie和删不掉的Cookie

