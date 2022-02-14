/*
 * @Author: huangyingli
 * @Date: 2022-02-13 13:39:54
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-13 14:16:32
 * @Description:
 */

let x: Array<number> = [];
let y: Array<number> = [];
let z: Array<number> = [];

/**
 * 汉诺塔移动
 * H(1) = 1
 * H(n) = H(n-1) + 1 + H(n-1) n>1
 */
function hanoiTower(x: number[], y: number[], z: number[], n: number) {
  if (n === 1) {
    move(x, z);
  } else {
    hanoiTower(x, z, y, n - 1);
    move(x, z);
    hanoiTower(y, x, z, n - 1);
  }

  return z;
}

let moveCount = 0;
function move(a: Array<number>, b: Array<number>) {
  moveCount++;
  b.push(a.pop() as number);
}

x.push(1, 2, 3, 4, 5, 6);

console.log(hanoiTower(x, y, z, x.length), moveCount);
