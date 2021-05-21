/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-05-17 22:15:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-17 23:10:02
 * @Description: 
 */
class A {
  constructor(name) {
    this.name = name
  }
  say() {

  }
}

class B extends A {

  constructor(name) {
    // this.name = name
    super(name)
    this.key = name
  }
  bye() {

  }
}

let b = new B('xxx')
console.log(b.name)