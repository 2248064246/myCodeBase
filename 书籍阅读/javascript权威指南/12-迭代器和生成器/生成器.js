/*
 * @Author: huangyingli
 * @Date: 2022-02-10 14:51:55
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-10 14:54:28
 * @Description: 
 */

function* step() {
  console.log('start')

  let a = yield('1')
  console.log(a)
  let b = yield('2')
  console.log(a, b)
  let c = yield('3')
  console.log(a, b, c)
}

let iter = step()

let a = iter.next('a')
console.log(a)
let b = iter.next('b')
console.log(b)
// let c = iter.next('c')
// console.log(c)