/*
 * @Author: huangyingli
 * @Date: 2022-01-28 00:15:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-29 12:59:17
 * @Description:
 */

async function getKey(originKey) {
  let key = await crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      hash: 'SHA-256',
      publicExponent: new Uint8Array([1, 0, 1]),
    },
    true,
    ['sign', 'verify']
  );
  return key;
}
let keyPromise = getKey('GGbone');

let pubKey;

async function sign(str) {
  const key = await keyPromise;
  console.log(key);
  await crypto.subtle.exportKey('spki', key.publicKey).then((pKey) => {
    console.log('p key: ', pKey);
    pubKey = window.btoa(String.fromCharCode.apply(null, new Uint8Array(pKey)));
    console.log(pubKey);
  });
  return await crypto.subtle.sign(
    {
      name: 'RSASSA-PKCS1-v1_5',
    },
    key.privateKey,
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

async function verify(signBase64, data) {
  // const key = await keyPromise;
  const key = await crypto.subtle.importKey(
    'spki',
    base64ToBuffer(pubKey).buffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      hash: 'SHA-256',
      publicExponent: new Uint8Array([1, 0, 1]),
    },
    true,
    ['verify']
  );
  console.log('keysss', key);
  return crypto.subtle.verify(
    {
      name: 'RSASSA-PKCS1-v1_5',
    },
    // key.publicKey,
    key,
    base64ToBuffer(signBase64).buffer,
    new TextEncoder().encode(data)
  );
}

sign('hello world').then((hashBuffer) => {
  console.log('签名buffer', hashBuffer);
  let str2 = String.fromCharCode.apply(null, new Uint8Array(hashBuffer));
  console.log('RSA-PSS-SHA-256: ', window.btoa(str2));
  verify(window.btoa(str2), 'hello world').then((isReal) => {
    console.log('签名验证结果: ', isReal);
  });
});
