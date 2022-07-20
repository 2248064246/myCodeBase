/*
 * @Author: huangyingli
 * @Date: 2022-07-20 16:00:38
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-20 16:59:48
 * @Description:
 */
function xhrPromise(
  url,
  method,
  headers,
  responseType = 'json',
  cb,
  progress = null
) {
  let rej, res;
  let promise = new Promise((resolve, reject) => {
    rej = reject;
    res = resolve;
  });
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  for (let key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  xhr.responseType = responseType;
  xhr.onload = function (ev) {
    if (/^2\d{2}$/.test(xhr.status)) {
      res(cb(xhr));
    } else {
      rej(ev);
    }
  };
  xhr.onprogress = progress;
  xhr.onerror = rej;
  xhr.timeout = rej;
  xhr.onabort = rej;

  xhr.send();

  return promise;
}

export { xhrPromise };
