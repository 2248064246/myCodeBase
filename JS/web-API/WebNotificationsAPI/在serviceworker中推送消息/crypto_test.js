/*
 * @Author: huangyingli
 * @Date: 2022-02-07 11:21:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-07 12:25:07
 * @Description:
 */

const webpush = require('web-push');
//VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();
console.log(vapidKeys.publicKey, vapidKeys.privateKey);