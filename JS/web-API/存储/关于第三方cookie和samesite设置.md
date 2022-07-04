# 关于第三方cookie 和 samesite 设置

## 第三方cookie

第三方cookie 就是由第三方网站发出的指向非自身服务的cookie

例如在A页面上引用一个B网站的图片链接, 此时会向B发送A站点的Cookie, 这个Cookie就是第三方Cookie


### 第三方Cookie的作用

**最常见的就是用户追踪**

通过将广告(通常是图片)嵌入某个站点, 就能收集这个站点的Cookie, 从而判断用户的喜好甚至是获取用户信息

**还有一个就是跨站点攻击(CSRF)**

一个通常的例子: 用户在A站登录了, 然后访问了某个危险网站B, B网站有一个如下表单
```html
<form action=A站的某个地址 method="POST">...</from>
```
这样就能通过B站向A站发送一个带有A站cookie的信息(emmm.... 有点玄乎, 这会引起跨域吧)

