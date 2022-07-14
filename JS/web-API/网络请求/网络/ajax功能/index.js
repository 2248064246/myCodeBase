/*
 * @Author: huangyingli
 * @Date: 2022-07-14 15:10:10
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-14 17:28:40
 * @Description:
 */

let xhr = new XMLHttpRequest();

xhr.open('get', 'http://localhost:8088/xxx');

xhr.setRequestHeader('Access-Control-Expose-Headers', '*')
xhr.setRequestHeader('Content-Type', 'text/plain')

xhr.responseType = 'text'

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && /^2\d{2}$/g.test(xhr.status)) {
    // success
    console.log(xhr.response, xhr);

    console.log(xhr.getAllResponseHeaders())

    console.log(xhr.getResponseHeader('name'))
  }
};

xhr.onload = function (ev) {
  if (/^2\d{2}$/g.test(xhr.status)) {
  }
};

xhr.timeout = 1000;
xhr.ontimeout = function () {
  console.log('超时了');
};

xhr.onabort = function () {
  console.log('取消请求');
};

xhr.onerror = function () {
  console.log('请求出错了');
};
xhr.send();
