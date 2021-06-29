/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-28 23:44:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-28 23:54:42
 * @Description: 
 */

import Stack from "./stack-weakMap.js"

let x = new Stack()
let y = new Stack()
let z = new Stack()

function Hanoi(n, x, y, z) {
  if (n == 1) {
    move(x, z)
  } else {
    Hanoi(n - 1, x, z, y);
    move(x, z);
    Hanoi(n - 1, y, x, z)
  }
}

let changeNum = 0

function move(from, to) {
  changeNum++
  to.push(from.pop())
}

let initAry = [1, 2, 3, 4, 5, 6, 7, 8]

initAry.forEach(item => {
  x.push(item)
})
Hanoi(x.size(), x, y, z)


console.log(changeNum)

while(!z.isEmpty()) console.log(z.pop())