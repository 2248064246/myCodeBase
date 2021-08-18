/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-16 12:00:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-17 19:53:00
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
{
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
}

// ES6 版本, 同上面两个
{
  const hashCode = s => s.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a
  }, 0)
}

// 其他例子, 参考 https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/22429679#22429679
{ // 一个简单但高质量的53位哈希。它非常快，提供非常好的散列分布，与任何32位散列相比，冲突率显著降低(JS限制为53位整数)
  const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
}

{ // 一个简单且高效的生成 hashCode 的方法
  const TSH = s => {
    for (var i = 0, h = 9; i < s.length;) h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
    return h ^ h >>> 9
  }
}

{
  // FNV-1a hash算法
  /**
   * Calculate a 32 bit FNV-1a hash
   * Found here: https://gist.github.com/vaiorabbit/5657561
   * Ref.: http://isthe.com/chongo/tech/comp/fnv/
   *
   * @param {string} str the input value
   * @param {boolean} [asString=false] set to true to return the hash value as 
   *     8-digit hex string instead of an integer
   * @param {integer} [seed] optionally pass the hash of the previous chunk
   * @returns {integer | string}
   */
  function hashFnv32a(str, asString, seed) {
    /*jshint bitwise:false */
    var i, l,
      hval = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if (asString) {
      // Convert to 8 digit hex string
      return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
  }
}

{
  // 这个的结果和上面的 hashFnv32a 结果一致, 实际上这个被应用于C#
  var utils = utils || {};

  utils.FNV_OFFSET_32 = 0x811c9dc5;

  utils.hashFnv32a = function (input) {
    var hval = utils.FNV_OFFSET_32;

    // Strips unicode bits, only the lower 8 bits of the values are used
    for (var i = 0; i < input.length; i++) {
      hval = hval ^ (input.charCodeAt(i) & 0xFF);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }

    return hval >>> 0;
  }

  utils.toHex = function (val) {
    return ("0000000" + (val >>> 0).toString(16)).substr(-8);
  }
}

{
  // 一个快速且简介的, 这个也是 <<javaScript数据结构和算法>>一书中介绍的
  String.prototype.hashCode = function () {
    var hash = 5381,
      i = this.length
    while (i)
      hash = (hash * 33) ^ this.charCodeAt(--i)
    return hash >>> 0;
  }
}

{
  /**
   * 这个方法类似字符串的hash方法, 且都是正值
   * @param {String} str 
   * @returns {Function}
   */
  function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
      h = h << 13 | h >>> 19;
    return function () {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
    }
  }
}

{
  // 对于32位的hash而言, 终究是会存在碰撞的
  // 推荐使用SHA-256及以上的方法(crypto.js)
  // 例外在说一下, chromium内核不在支持 window.crypto??(8-17日)
}