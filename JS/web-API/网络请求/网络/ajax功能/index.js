/*
 * @Author: huangyingli
 * @Date: 2022-07-14 15:10:10
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-18 16:40:56
 * @Description:
 */

let xhr = new XMLHttpRequest();

xhr.open('post', 'http://localhost:8088/postJson');
// xhr.open('post', 'http://localhost:8088/postFormData');
// xhr.open('post', 'http://localhost:8088/postFormUrl');

xhr.setRequestHeader('Access-Control-Expose-Headers', '*')
// xhr.setRequestHeader('Content-Type', 'text/plain')

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

// xhr.timeout = 1000;
xhr.ontimeout = function () {
  console.log('超时了');
};

xhr.onabort = function () {
  console.log('取消请求');
};

xhr.onerror = function () {
  console.log('请求出错了');
};
// xhr.setRequestHeader('content-type', 'application/json')
// xhr.send(JSON.stringify({a: 123}));
// xhr.setRequestHeader('content-type', 'multipart/form-data')
// let form = new FormData();
// form.append('a', '123')
// xhr.send(form)

let obj = {a: 123}

function obj2search(obj, decode) {
  if (typeof obj !== 'object') return ''
  let searchAry = []
  for (const key in obj) {
    let value = obj[key]
    value = (typeof value === 'object' ? JSON.stringify(value) : value)
    let searchItem = (key + '=') + (decode ? encodeURIComponent(value) : value)
    searchAry.push(searchItem)
  }
  return searchAry.join('&')
}


xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
xhr.send(obj2search(obj, true))
