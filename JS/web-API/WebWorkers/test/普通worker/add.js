/*
 * @Author: huangyingli
 * @Date: 2022-04-07 11:23:05
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-07 11:46:52
 * @Description:
 */

onmessage = function (e) {
  const result = e.data[0] * e.data[1];
  if (!isNaN(result)) {
    postMessage(result);
  }
};
