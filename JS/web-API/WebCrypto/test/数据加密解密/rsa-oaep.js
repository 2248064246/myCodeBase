/*
 * @Author: huangyingli
 * @Date: 2022-01-29 13:48:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-29 14:16:55
 * @Description:
 */

async function getKey(originKey) {
  let key = await crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      hash: 'SHA-256',
      publicExponent: new Uint8Array([1, 0, 1]),
    },
    true,
    ['encrypt', 'decrypt']
  );
  return key;
}

let keyPromise = getKey();
async function encrypt(str) {
  const key = await keyPromise;
  console.log(key);
  await crypto.subtle.exportKey('pkcs8', key.privateKey).then((pKey) => {
    console.log('p key: ', pKey);
    pubKey = window.btoa(String.fromCharCode.apply(null, new Uint8Array(pKey)));
    console.log(pubKey);
  });

  return await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    key.publicKey,
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
    'pkcs8',
    base64ToBuffer(pubKey).buffer,
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      hash: 'SHA-256',
      publicExponent: new Uint8Array([1, 0, 1]),
    },
    true,
    ['decrypt']
  );

  console.log('解密秘钥', key)

  return crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
    },
    key,
    base64ToBuffer(deBase64).buffer
  );
}

encrypt('hello world').then((hashBuffer) => {
  console.log('加密buffer', hashBuffer);
  let str2 = String.fromCharCode.apply(null, new Uint8Array(hashBuffer));
  console.log('RSA-OAEP: ', window.btoa(str2))
  decrypt(window.btoa(str2), 'hello world').then((isReal) => {
    console.log('解密结果: ', isReal, new TextDecoder().decode(isReal));
  });
});
