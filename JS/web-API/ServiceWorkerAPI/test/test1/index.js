/*
 * @Author: huangyingli
 * @Date: 2022-01-24 16:40:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-24 17:10:36
 * @Description:
 */
let path = '/test1/';
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`${path}sw.js`, { scope: path })
    .then(function (reg) {
      console.log(reg)
      if (reg.installing) {
        console.log('安装中');
      } else if (reg.waiting) {
        console.log('已安装');
      } else if (reg.active) {
        console.log('已激活');
      }
    })
    .catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}
