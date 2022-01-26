/*
 * @Author: huangyingli
 * @Date: 2022-01-26 14:54:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-26 23:46:10
 * @Description:
 */
const text = 'hello world';
async function digestMessage(message) {
  const encoder = new TextEncoder('utf-8');
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return hash;
}

digestMessage(text).then((digestBuffer) => {
  console.log(digestBuffer);
  let str2 =  String.fromCharCode.apply(null, new Uint8Array(digestBuffer))
  console.log(str2);
  console.log(window.btoa(str2))
});

/* 这是 crypto-js 库提供的信息摘要算法 */
console.log('CryptoJS: ', CryptoJS.enc.Base64.stringify(CryptoJS.SHA256('hello world')))