/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-17 17:20:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-18 10:42:51
 * @Description: 
 */

/**
 * 随机数分类
 *    　1）真随机数：产生的数不可预计，也不可能重复产生两个相同的真随机数序列。
 *         真随机数只能通过某些随机的物理过程来产生，如放射性衰变、电子设备的热噪声等
 *      2）准随机数：其随机数序列不具备随机性质，仅仅是用它来处理问题能够得到正确的结果。
 *      3）伪随机数：通过某种数学公式或者算法产生的数值序列。虽然在数学意义上伪随机数是不随机的，
 *         但是如果能够通过统计检验，可以当成真随机数使用
 */

// 在实践中, 随机化算法是使用近似的伪随机数发生器代替随机比特的真实来源
// 并不真正的随机，但具有类似于随机数的统计特征，如均匀性、独立性等。
// 在计算伪随机数时，若使用的初值（种子）不变，那么伪随机数的数序也不变


/**
 * 1.计算机的伪随机数是由随机种子根据一定的计算方法计算出来的数值。
 *   所以，只要计算方法一定，随机种子一定，那么产生的随机数就是固定的。
 * 2.只要用户或第三方不设置随机种子，那么在默认情况下随机种子来自系统时钟。(对于C, C++而言)
 */

/**
 * 一个下述方法的测试可视化页面
 * https://observablehq.com/@tidwall/hello-randomness
 */

/**
 * 这个方法类似字符串的hash方法, 且都是正值
 * @param {String} str 
 * @returns {Function} 返回一个方法, 每次调用都会生成不同的种子
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


/**
 * sfc32 伪随机生成方法, a, b, c, d 分别是四个随机种子
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} c 
 * @param {Number} d 
 * @returns {Function} 返回一个随机数生成器
 */
function sfc32(a, b, c, d) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296; // 限定 0~1 之间
  }
}

/**
 * Mulberry32是一个32位状态的简单生成器，但是速度非常快，质量也很好
 * @param {Number} a 随机种子 
 * @returns {Function} 返回一个随机数生成器
 */
function mulberry32(a) {
  return function () {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296; // 限定 0~1 之间
  }
}

/**
 * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} c 
 * @param {Number} d 
 * @returns {Function} 返回一个随机数生成器
 */
function xoshiro128ss(a, b, c, d) {
  return function () {
    var t = b << 9,
      r = a * 5;
    r = (r << 7 | r >>> 25) * 9;
    c ^= a;
    d ^= b;
    b ^= c;
    a ^= d;
    c ^= t;
    d = d << 11 | d >>> 21;
    return (r >>> 0) / 4294967296; // 限定 0~1 之间
  }
}

/**
 * 速度中等
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} c 
 * @param {Number} d 
 * @returns {Function} 返回一个随机数生成器
 */
function jsf32(a, b, c, d) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    var t = a - (b << 27 | b >>> 5) | 0;
    a = b ^ (c << 17 | c >>> 15);
    b = c + d | 0;
    c = d + t | 0;
    d = a + t | 0;
    return (d >>> 0) / 4294967296;
  }
}

/**
 * 这是一个很快的伪随机方法, 性能接近 Math.random
 * @param {Number} seed 
 * @returns {Function} 返回一个随机数生成器
 */
function antti(seed) {
  var m_w = 123456789;
  var m_z = 987654321;
  var mask = 0xffffffff;
  m_w = (123456789 + seed) & mask;
  m_z = (987654321 - seed) & mask;
  return function () {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    return ((m_z << 16) + (m_w & 65535)) >>> 0 / 4294967296;
  }
}

/**
 * 这个方法比 Math.random 要慢上2~3倍
 * @param {Number} seed 
 * @returns {Function} 返回一个随机数生成器
 */
function antti2(seed) {
  return function () {
    var x = Math.sin(seed++) * 10000;
    return (x - Math.floor(x));
  }
}


/**
 * 生成 0 ~ 1 随机数 IE11+, 这个方法很慢, 是MDN官方推荐的强随机数生成方式
 * @param {Number} seed 
 * @returns {Function} 返回一个随机数生成器
 */
function randomFloat(seed) {
  // 生成 32 位随机值
  const fooArray = new Uint32Array(seed);
  // 最大值是 2^32 –1
  const maxUint32 = 0xFFFFFFFF;
  // 用最大可能的值来除
  return function () {
    return crypto.getRandomValues(fooArray)[0] / maxUint32 // crypto.getRandomValues IE11+
  };
}

/**
 * 这个方法在seed给定的情况下, 随机性并不如前面的
 * https://gist.github.com/mathiasbynens/5670917
 * @returns 
 */
function createDeterministicRandom() {
  let seed = 0x2F6E2B1;
  return function () {
    // Robert Jenkins’ 32 bit integer hash function
    seed = ((seed + 0x7ED55D16) + (seed << 12)) & 0xFFFFFFFF;
    seed = ((seed ^ 0xC761C23C) ^ (seed >>> 19)) & 0xFFFFFFFF;
    seed = ((seed + 0x165667B1) + (seed << 5)) & 0xFFFFFFFF;
    seed = ((seed + 0xD3A2646C) ^ (seed << 9)) & 0xFFFFFFFF;
    seed = ((seed + 0xFD7046C5) + (seed << 3)) & 0xFFFFFFFF;
    seed = ((seed ^ 0xB55A4F09) ^ (seed >>> 16)) & 0xFFFFFFFF;
    return (seed & 0xFFFFFFF) / 0x10000000;
  };
}

// 例子
let seed = xmur3('GGBone')

let r_sfc32 = sfc32(seed(), seed(), seed(), seed())
console.log(r_sfc32())
console.log(r_sfc32())
console.log(r_sfc32())
console.log(r_sfc32())