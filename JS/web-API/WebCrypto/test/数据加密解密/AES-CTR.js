/*
 * @Author: huangyingli
 * @Date: 2022-01-29 13:48:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-01 13:17:54
 * @Description:
 */

let iv ;
async function getKey(originKey) {
  let originBuffer = new TextEncoder().encode(originKey);
  iv =  new Uint8Array(16).map(
    (el, idx, arr) => (arr[idx] = originBuffer[idx] || 48)
  )
  return crypto.subtle.importKey(
    'raw',
    iv,
    'AES-CTR',
    true,
    ['encrypt', 'decrypt']
  );
  // return crypto.subtle.generateKey({ name: 'AES-CTR', length: 128 }, true, [
  //   'encrypt',
  //   'decrypt',
  // ]);
}

let keyPromise = getKey('GGbone0000000000');
// let keyPromise = getKey('GGbone');
async function encrypt(str) {
  const key = await keyPromise;
  console.log(key);
  await crypto.subtle.exportKey('raw', key).then((pKey) => {
    console.log('p key: ', pKey);
    pubKey = window.btoa(String.fromCharCode.apply(null, new Uint8Array(pKey)));
    console.log(pubKey);
  });

  return await crypto.subtle.encrypt(
    {
      name: 'AES-CTR',
      /* 16字节随机数 */
      counter: iv,
      /* 必须大于等于64 */
      length: 128,
    },
    key,
    new TextEncoder().encode(str)
  );
}
function base64ToBuffer(base64) {
  let str = window.atob(base64);
  let unit8Ary = new Uint8Array(str.length);
  Array.prototype.forEach.call(unit8Ary, function (el, idx, arr) {
    arr[idx] = str.charCodeAt(idx);
  });
  return unit8Ary;
}

async function decrypt(deBase64) {
  const key = await crypto.subtle.importKey(
    'raw',
    base64ToBuffer(pubKey).buffer,
    'AES-CTR',
    true,
    ['decrypt']
  );

  console.log('解密秘钥', key);

  return crypto.subtle.decrypt(
    {
      name: 'AES-CTR',
      counter: iv,
      /* 必须大于等于64 */
      length: 128,
    },
    key,
    base64ToBuffer(deBase64).buffer
  );
}

encrypt('hello worldxxxxx').then((hashBuffer) => {
  console.log('加密buffer', hashBuffer);
  let str2 = String.fromCharCode.apply(null, new Uint8Array(hashBuffer));
  console.log('AES-CTR: ', window.btoa(str2));
  decrypt(window.btoa(str2), 'hello world').then((isReal) => {
    console.log('解密结果: ', isReal, new TextDecoder().decode(isReal));
  });
});
