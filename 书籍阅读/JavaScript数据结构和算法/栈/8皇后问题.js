/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-29 00:29:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-29 23:05:08
 * @Description: 
 */


let allCount = 0

/**
 * 
 * @param {Array} queens 代表女王个数和位置的数组
 * @param {Number} cur 表示当前需要移动的女王
 */
function queen(queens, cur) {

  if (queens.length === cur) {
    // 移动超过了女王个数界限, 则表示找到了一次位置
    console.log(queens)
    allCount++
    return
  }
  for (var i = 0; i < queens.length; i++) {
    // 每个女王在纵轴上有8个位置可以放
    queens[cur] = i // 用来表示当前女王纵轴位置

    // 我们需要判断当前位置是否符合规则
    let flag = true
    for (var j = 0; j < cur; j++) { // 需要和之前的女王位置比较
      // 1. 不同同 x 轴
      // 2. 不能同斜角 (x 轴差 !== y 轴差)
      let y = Math.abs(i - queens[j])
      let x = Math.abs(cur - j)
      if (queens[j] === i || x === y) {
        flag = false // 表示当前位置不行
        break; // 可以不用和其他的女王比较了
      }
    }
    if (flag) {
      queen(queens, cur + 1) // 如果当前女王符合位置, 则找下一个女王位置
    }
  }
}

queen([1, 1, 1, 1, 1, 1, 1, 1], 0);

console.log(allCount)