/*
 * @Author: huangyingli
 * @Date: 2022-01-26 14:54:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-27 19:56:52
 * @Description:
 */
const text = 'â¤ī¸đđđ';
async function digestMessage(message) {
  const encoder = new TextEncoder('utf-8');
  const data = encoder.encode(message);

  console.log(new TextDecoder().decode(data));
  const hash = await crypto.subtle.digest('SHA-256', data);
  return hash;
}

digestMessage(text).then((digestBuffer) => {
  console.log(digestBuffer);
  let str2 = String.fromCharCode.apply(null, new Uint8Array(digestBuffer));
  console.log(str2);
  console.log(window.btoa(str2));
});

/* čŋæ¯ crypto-js åēæäžįäŋĄæ¯æčĻįŽæŗ */
console.log(
  'CryptoJS: ',
  CryptoJS.enc.Base64.stringify(CryptoJS.SHA256('â¤ī¸đđđ'))
);
