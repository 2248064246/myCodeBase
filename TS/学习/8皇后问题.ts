/*
 * @Author: huangyingli
 * @Date: 2022-02-13 15:12:39
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-14 10:14:12
 * @Description:
 */

/**
 * 在8×8格的国际象棋上摆放8个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法
 * 以每条纵轴做循环, 通知需要遍历之前的值
 * 查找当前结果是否符合规则
 * 符合规则继续便利下一个纵轴
 * 
 * 回溯法
 */
let allCount1 = 0;
let count = 0;
function queens(ary: Array<number>, cur: number) {
  // console.log(ary)
  if (ary.length === cur) {
    // console.log(ary);
    allCount1++;
    return;
  }

  for (let i = 0; i < ary.length; i++) {
    /* 每条纵轴从0开始遍历 */
    ary[cur] = i;

    let flag = true;
    /* 查找是否符合规则 */
    for (let j = 0; j < cur; j++) {
      count++;
      /* 之前点和当前点的x和y距离 */
      let x = Math.abs(cur - j);
      let y = Math.abs(i - ary[j]);

      /* x, y 距离相等说明同斜线, y===0 说明同一行 (同一列是不可能的) */
      if (x === y || y === 0) {
        flag = false;
        break;
      }
    }

    /* 如果当前位置符合要求, 则遍历后一列 */
    if (flag) {
      queens(ary, cur + 1);
    }
  }
}

queens([0, 0, 0, 0, 0, 0, 0, 0], 0);

console.log(allCount1, count)