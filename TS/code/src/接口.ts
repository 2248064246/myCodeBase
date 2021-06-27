/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-27 18:35:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-27 19:31:23
 * @Description: 
 */


interface Person {
  readonly id: number
  name: string,
}

let my:Person = {
  id: 1,
  name: 'tom',
}

interface SuperMan extends Person {
  flaySpeed: number
}

let superman:SuperMan = {
  flaySpeed: 1000,
  name: 'Tom',
  id: 111
}
