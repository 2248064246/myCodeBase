/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-28 23:23:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-28 23:37:23
 * @Description: 
 */
import Stack from "./stack-weakMap.js"

function parenthesisMatches(parenthesis) {
  let stack = new Stack(), matches = '()[]{}'
  parenthesis.split('').forEach(item => {
    if(stack.isEmpty()) stack.push(item)
    else {
      let popIndex = matches.indexOf(stack.peek())
      let itemIndex = matches.indexOf(item)
      if(popIndex + 1 !== itemIndex) {
        stack.push(item)
      }else {
        stack.pop()
      }
    }
  })
  if(stack.isEmpty()) return true
  return false
}

console.log(parenthesisMatches('((([][][])))'))