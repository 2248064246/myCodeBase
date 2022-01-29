/*
 * @Author: huangyingli
 * @Date: 2022-01-27 19:58:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-28 01:21:32
 * @Description:
 */

async function getKey(originKey) {
  /* 这种生成的是随机密码 */
  // let hmacKey = await crypto.subtle.generateKey(
  //   {
  //     name: 'HMAC',
  //     hash: 'SHA-256',
  //   },
  //   true,
  //   ['sign', 'verify']
  // );
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(originKey),
    {
      name: 'HMAC',
      hash: 'SHA-256',
    },
    true,
    ['sign', 'verify']
  );
}

let keyPromise = getKey('GGbone');

async function sign(str) {
  const key = await keyPromise;
  return await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(str));
}

async function verify(signBase64, data) {
  let str = window.atob(signBase64);
  let unit8Ary = new Uint8Array(str.length);
  Array.prototype.forEach.call(unit8Ary, function (el, idx, arr) {
    arr[idx] = str.charCodeAt(idx);
  });
  const key = await keyPromise;
  return crypto.subtle.verify(
    {
      name: 'HMAC',
      hash: 'SHA-256',
    },
    key,
    unit8Ary,
    new TextEncoder().encode(data)
  );
}

sign('hello world').then((hashBuffer) => {
  console.log(hashBuffer);

  let str2 = String.fromCharCode.apply(null, new Uint8Array(hashBuffer));
  /* 这里和 CryptoJS 库的结果一致 */
  console.log('HMAC-SHA-256: ', window.btoa(str2));

  console.log(
    'CryptoJS 对照:',
    CryptoJS.HmacSHA256('hello world', 'GGbone').toString(CryptoJS.enc.Base64)
  );

  verify(window.btoa(str2), 'hello world').then((isReal) => {
    console.log('签名验证结果: ', isReal);
  });
});
