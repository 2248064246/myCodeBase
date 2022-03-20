/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-03 10:11:20
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-20 13:18:19
 * @Description: 
 */

/**
 * 最少硬币找零是给出要找零的钱, 
 * 以及可用的银币面额及其数量,
 * 找到所需的最少的银币个数
 */

/**
 * 使用动态规划解决
 * 1. 需要计算出每一种所需要的硬币数, 然后单前需要的硬币数可以从前面找
 *    例如: [1, 3, 4] 这些硬币, 要找6, 需要依次算出 1, 2, 3, 4, 5 各种情况, 6 = 1 + 5 || 3 + 3 ...
 */

function minCoinChange(coins, amount) {

  let cache = [] // 用来缓存各种情况的硬币数
  function makeChange(amount) {
    if (amount <= 0) {
      return []
    }
    if (cache[amount]) {
      return cache[amount]
    }
    let min = [], // 用于记录循环中找到的最小解法
      newMin = [], // 用于记录最小的子解法 
      newAmount;
    for (const coin of coins) {
      // 最终的结果就是当前 coin + [newAmount的最小解法] 
      newAmount = amount - coin // 新要计算的钱数 (通过这里计算各种可能值)
      if (newAmount >= 0) {
        newMin = makeChange(newAmount) // 计算要找的硬币
      }
      if (newAmount >= 0 && // 剩余要找必须 >= 0, 不然非法(想想找 -1, 这怎么可能)
        // 如果剩余要找的结果长度 > 当前最小长度 - 1 也是不行的, 例如: [1, 1, 1] 和 [1, 2, 2]  应为min是完整的答案, 而 newMin是子答案, 所以需要 -1
        // !min.length 是当 newAmount = 0 时, min这时是没值的
        (newMin.length < min.length - 1 || !min.length) &&
        // 同样, 当 newAmount 为0时, newMin 同样是没值的(我觉得这个条件没有必要)
        (newMin.length || !newAmount)) {
        min = [coin].concat(newMin)
      }
    }
    return cache[amount] = min // 将cache更新, 并返回该结果
  }
  return makeChange(amount)
}


/**
 * 这个也好巧妙啊... (贪心算法, 结果跟快, 但是没有动态规划准确)
 * @param {*} coins 
 * @param {*} amount 
 * @returns 
 */
// function minCoinChange(coins, amount) {
//   const change = [];
//   let total = 0;
//   for (let i = coins.length; i >= 0; i--) {
//     const coin = coins[i];
//     while (total + coin <= amount) {
//       change.push(coin);
//       total += coin;
//     }
//   }
//   return change;
// }

console.log(minCoinChange([1, 5, 10, 25], 36))