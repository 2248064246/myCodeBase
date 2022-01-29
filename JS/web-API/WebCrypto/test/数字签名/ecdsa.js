/*
 * @Author: huangyingli
 * @Date: 2022-01-28 00:15:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-29 12:18:58
 * @Description:
 */

async function getKey(originKey) {
  let key = await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true,
    ['sign', 'verify']
  );
  return key;
  // return crypto.subtle.importKey(
  //   'raw',
  //   new TextEncoder().encode(originKey),
  //   {
  //     name: 'ECDSA',
  //     namedCurve: 'P-256',
  //   },
  //   true,
  //   ['sign', 'verify']
  // );
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
      name: 'ECDSA',
      /* 这是指定要使用的摘要算法标识符: SHA-256, SHA-384, SHA-512 三种一致 */
      /* 这个和 namedCurve 没有关联 */
      hash: 'SHA-256',
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
    // 'jwk',
    // {
    //   crv: 'P-256',
    //   ext: true,
    //   key_ops: ['verify'],
    //   kty: 'EC',
    //   x: '3qZKOBcQtrBWG09jS3YxEJkvRm16k1dTgKOxFU12iks',
    //   y: 'rRwGf--2B3YH37Wsjamd_EwzjTrdS5AOztgDw3JqfcA',
    // },
    'spki',
    base64ToBuffer(pubKey).buffer,
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true,
    ['verify']
  );
  console.log('keysss', key);
  return crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: 'SHA-256',
    },
    // key.publicKey,
    key,
    base64ToBuffer(signBase64).buffer,
    new TextEncoder().encode(data)
  );
}

sign('hello world').then((hashBuffer) => {
  console.log(hashBuffer);
  let str2 = String.fromCharCode.apply(null, new Uint8Array(hashBuffer));
  console.log('ECDSA-SHA-256: ', window.btoa(str2));
  verify(window.btoa(str2), 'hello world').then((isReal) => {
    console.log('签名验证结果: ', isReal);
  });
});
