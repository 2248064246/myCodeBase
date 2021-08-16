/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-16 12:00:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 15:53:04
 * @Description: 
 */


// 1. 基于Java String.hashCode
String.prototype.hashCode = function () {
  var hash = 0,
    i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit leteger
  }
  return hash;
};


// 2. 这个的结果同上面那个
function hashCode(value) {
  let h = 0;
  if (h == 0 && value.length > 0) {
    for (let i = 0; i < value.length; i++) {
      h = 31 * h + value.charCodeAt(i); // 31 * h == (hash << 5) - hash
      h |= 0; // &
    }
  }
  return h;
}