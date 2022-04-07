/*
 * @Author: huangyingli
 * @Date: 2022-04-07 14:10:08
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-07 14:25:36
 * @Description:
 */
onconnect = function (es) {
  let port = es.ports[0];
  port.onmessage = function (e) {
    console.log('xxx', es.ports);
    const result = e.data[0] * e.data[1];
    if (!isNaN(result)) {
      port.postMessage(result);
    }
  };
};
