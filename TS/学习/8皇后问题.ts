/*
 * @Author: huangyingli
 * @Date: 2022-02-13 15:12:39
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-14 08:35:24
 * @Description:
 */

/**
 * 在8×8格的国际象棋上摆放8个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法
 */
function queens(ary: Array<number>, cur: number) {
  if (queens.length === cur) {
    console.log(queens);
    return;
  }

  for (let i = 0; i < ary.length; i++) {

    for(let j = 0; j< cur; j++) {
      
    }
  }
}
