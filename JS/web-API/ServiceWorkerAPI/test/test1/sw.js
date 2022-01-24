/*
 * @Author: huangyingli
 * @Date: 2022-01-24 16:33:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-24 18:01:33
 * @Description:
 */

self.addEventListener('install', (event) => {
  console.log('安装完成: ', event);
  event.waitUntil(
    caches.open('v2').then((cache) => {
      return cache.addAll([
        // '/img/bountyHunters.jpg',
        '/test1/test2.css',
        '/test1/test2.js',
        // '/test1/index.html',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('激活完成: ', event);
  var cacheWhitelist = ['v2'];

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('message', (event) => {
  console.log('message 事件', event);
});

self.addEventListener('fetch', (event) => {
  console.log('fetch event', event);
  if(event.request.url.indexOf('index.html')) return
  event.respondWith(
    caches.match(event.request).then((response) => {
      console.log('response', response);
      if (response !== undefined) {
        return response;
      } else {
        fetch(event.request)
          .then((response) => {
            console.log('缓存没有, 重新获取:', response);
            let responseClone = response.clone();
            caches.open('v1').then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch((err) => {
            console.warn('资源获取错误:', err);
          });
      }
    })
  );
});
