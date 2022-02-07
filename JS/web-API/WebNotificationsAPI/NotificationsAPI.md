# Notification API

允许网页向用户同送系统级消息

这需要用户授予站点通知推送权限
`这通常在应用或站点初始化时, 使用Notification.requestPermission() 方法来完成。`

此特性可以在 web worker 中运行

此特性需要安全上下文

页面上的推送并不是需要特别关注的, 需要关注的是如何在 service worker 中实现后台消息推送

### 在 service worker 通过添加订阅形式进行通知推送

在 service worker 激活之后, 可以通过返回的`ServiceWorkerRegistration` 对象进行通知订阅

**页面**

```js
navigator.serviceWorker
  .register(`${path}sw.js`, {
    scope: path,
  })
  .then((reg) => {
    /* 需要 reg.active == true 的情况下 */
    /* 向service worker 添加一条订阅 */
    reg.pushManager
      .subscribe({
        userVisibleOnly: true,
        /* 这个是服务器生成的公钥 */
        /* 看文档说明公钥需要 椭圆曲线为 P-256 的 ECDSA 公钥*/
        /* 在服务端可以用 web-push 库生成秘钥对 */
        /* 接受 DOMString OR ArrayBuffer */
        applicationServerKey: publicKey,
      })
      .then((subscription) => {
        /*这个是订阅详情, 需要返回给服务器 */
        console.log(subscription.toJSON());
        /**
         * endpoint
         * keys
         *    auth
         *    p256dh
         * */

        fetch('http://localhost:8900/sub', {
          method: 'post',
          body: JSON.stringify(subscription.toJSON()),
        });
      });
  });
```

**服务器**

```js
// 服务器根据订阅信息发送消息
const webpush = require('web-push');

const payload = {
  title: '一篇新的文章',
  body: '点开看看吧',
  icon: '',
};
webpush.sendNotification(subscription, JSON.stringify(payload), {
  /* 这个是通知应用的 APIKey */
  /* 不同浏览器的通知应用不同, 不同浏览器生成的 subscription 的 endpoint 地址不同 */
  /* 目前chrome使用 Firebase Cloud Messaging API(即FCM)*/
  /* 具体配置看 https://pushalert.co/blog/how-to-get-gcm-api-key-project-number/ */
  /* Microsoft Edge 使用 Azure 的 通知中心 服务 https://portal.azure.com/#allservices/category/Web*/

  /* Microsoft Edge 中也可以使用 Chrome 的 Firebase Cloud Messaging API (这是万万没想到)*/
  gcmAPIKey: 'AIzaSyCMcXhToaMbt4ss0yZivoFAyMP1ypYVUbM',
  vapidDetails: {
    subject: 'mailto:2248064246@qq.com',
    publicKey:
      'BHOTmPQ2g07abRvtXhKDpfPizDOtSSnsHd4IaV8l3Pig5elrGCqYEcroxs7NR7Ib8hcMFt8omYRDWXEywXt196k',
    privateKey: 'krwW6R8Cd6bFjctpprZXVP5n1UEvd74RLYk8Ho6nG9I',
  },
});
```

**service worker**

```js
/* 在service worker 中监听 push 事件, 来响应消息推送服务器发送过来的消息 */
self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  let notificationData = event.data.json();
  const title = notificationData.title;
  // 可以发个消息通知页面
  //util.postMessage(notificationData);
  // 弹消息框
  event.waitUntil(self.registration.showNotification(title, notificationData));
});
```

> 这种方式需要客户端有外网访问功能, 因为通知的订阅和推送都需要第三方服务器

> 可以实现页面关闭之后依旧能接收通知, 只要浏览器启动