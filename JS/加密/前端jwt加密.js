/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-07-22 13:53:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-23 10:14:43
 * @Description: 
 */


function base64UrlEncode(str) {
  var encodedSource = Base64.encode(str)
  var reg = new RegExp('/', 'g');
  encodedSource = encodedSource.replace(/=+$/, '').replace(/\+/g, '-').replace(reg, '_');
  return encodedSource;
}

let header = JSON.stringify({
  "alg": "HS512"
})

let payload = JSON.stringify({
  "uuid": "1627004758982",
  "timestamp": 1627004758982,
  "work_id": "20208156",
  "user_name": "丁仁鑫",
  "hospital_id": "HID0101",
  "hospital_name": "四川大学华西医院"
});
let secretSalt = "K99UvADcsXBI0iT7Ka6RtQ==";
let key = CryptoJS.SHA256(secretSalt)
let baseH = base64UrlEncode(header)
let baseP = base64UrlEncode(payload)
let encodeMsg = baseH + '.' + baseP
let sig = CryptoJS.HmacSHA512(encodeMsg, key.toString())

var reg = new RegExp('/', 'g');
let sign = sig.toString(CryptoJS.enc.Base64).replace(/=+$/, '').replace(/\+/g, '-').replace(reg, '_');

console.log(baseH + '.' + baseP + '.' + sign)