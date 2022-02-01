/*
 * @Author: huangyingli
 * @Date: 2022-02-01 23:35:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-01 23:54:09
 * @Description:
 */

function getKeyMaterial() {
  let password = window.prompt('Enter your password');
  let enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
}

async function encrypt(text, salt, iv) {
  let keyMaterial = await getKeyMaterial();
  let key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      /* ArrayBuffer, 至少16字节 */
      salt: strTo128Bits(salt),
      /* 表示将在算法中执行哈希函数的次数, 理论上越多秘钥被破的几率越小, 不过越多的次数会消耗更多时间 */
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-CBC', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  return window.crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: strTo128Bits(iv),
    },
    key,
    new TextEncoder().encode(text)
  );
}

/* 用于将输入字符转为 128位比特, 少的补零, 多的裁减 */
function strTo128Bits(str) {
  let result = new Uint8Array(16);

  let strTypeAry = new TextEncoder().encode(str);

  return result.map((el, idx, arr) => {
    arr[idx] = strTypeAry[idx] || 0;
  });
}


console.log(encrypt('hello worldxxxxx', 'GGbone', 'GGbone').then(result => {
  console.log(result)
}))