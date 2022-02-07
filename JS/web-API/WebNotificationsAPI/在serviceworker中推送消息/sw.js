/*
 * @Author: huangyingli
 * @Date: 2022-02-07 11:09:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-07 12:40:18
 * @Description:
 */

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
