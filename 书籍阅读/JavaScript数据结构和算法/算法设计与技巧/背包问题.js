/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-03 13:50:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-03 14:30:54
 * @Description: 
 */

function findValues(n, capacity, kS) { // 这个有问题
  let i = n;
  let k = capacity;
  console.log('构成解的物品:');
  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log(
        `物品' ${i} ' 可以是解的一部分: w: ${weights[i - 1]}, v: ${values[i - 1]}`
      );
      i--;
      k -= kS[i][k];
    } else {
      i--;
    }
  }
}

/**
 * 背包问题
 * @param {Number} capacity 背包总携带质量
 * @param {Array} weights 物品重量数组
 * @param {Array} values 物品价值数组
 * @param {Number} n 物品数组长度
 * @returns 
 */
function knapSack(capacity, weights, values, n) {
  const kS = [];
  for (let i = 0; i <= n; i++) {
    kS[i] = [];
  }
  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        kS[i][w] = 0;
      } else if (weights[i - 1] <= w) {
        const a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
        const b = kS[i - 1][w];
        kS[i][w] = a > b ? a : b; // max(a,b)
        // console.log(a + ' can be part of the solution');
      } else {
        kS[i][w] = kS[i - 1][w];
      }
    }
    // console.log(kS[i].join());
  }
  // extra algorithm to find the items that are part of the solution
  findValues(n, capacity, kS);
  return kS[n][capacity];
}

/**
 * 使用迭代法解
 * @param {*} capacity 
 * @param {*} weights 
 * @param {*} values 
 * @param {*} n 
 * @returns 
 */
function knapSack(capacity, weights, values, n) {
  if (n === 0 || capacity === 0) {
    return 0;
  }
  if (weights[n - 1] > capacity) {
    return knapSack(capacity, weights, values, n - 1);
  }
  const a = values[n - 1] + knapSack(capacity - weights[n - 1], weights, values, n - 1);
  const b = knapSack(capacity, weights, values, n - 1);
  return a > b ? a : b;
}


/**
 * 允许计算分数 (但是感觉有点问题)-- 贪心算法, 速度更快, 但是结果不准确
 * @param {*} capacity 
 * @param {*} weights 
 * @param {*} values 
 * @returns 
 */
function knapSack(capacity, weights, values) {
  const n = values.length;
  let load = 0;
  let val = 0;
  for (let i = 0; i < n && load < capacity; i++) {
    if (weights[i] <= capacity - load) {
      val += values[i];
      load += weights[i];
      // console.log('using item ' + (i + 1) + ' for the solution');
    } else {
      const r = (capacity - load) / weights[i];
      val += r * values[i];
      load += weights[i];
      // console.log('using ratio of ' + r + ' for item ' + (i + 1) + ' for the solution');
    }
  }
  return val;
}

const values = [3, 3, 5],
  weights = [2, 3, 4],
  capacity = 5,
  n = values.length;
console.log(knapSack(capacity, weights, values, n))