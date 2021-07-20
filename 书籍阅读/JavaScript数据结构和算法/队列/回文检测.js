/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-07-05 21:28:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-05 22:12:58
 * @Description: 
 */

import Queue from './双端队列.js'

function palindromeCheck(str) {
  let result = true
  if (!str || typeof str !== 'string') return !result;

  let queue = new Queue()
  Array.from(str).forEach(item => queue.addBack(item))

  while (queue.size() > 1) {
    let front = queue.removeFront().toLowerCase()
    let back = queue.removeBack().toLowerCase()
    if (front.localeCompare(back)) {
      result = false
      break;
    }
  }
  return result
}

console.log(palindromeCheck('上海自来水来自海上'))
console.log(palindromeCheck('kayaK'))
console.log(palindromeCheck('a'))