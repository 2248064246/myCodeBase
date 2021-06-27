/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-27 19:36:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-27 21:06:52
 * @Description: 
 */



let ary1:Array<any> = [1, '1']


// function createArray<T>(length:number, value:T):Array<T> {
//   return new Array(length).fill(value)
// }

// createArray(3, 'xx') // T表示函数输入的的类型

// createArray<number>(3, 1)// 也可以在函数生成的时候指定类型 T


// interface Utils {
//   createArray<T>(length: number, value: T):Array<T>
// }

interface Utils<T> {
  createArray(len: number, value:T):Array<T>
}

let utils:Utils<string> = {
  createArray(length, value) {
    return new Array(length).fill(value)
  }
}

utils.createArray(3, '3')


class Demo<T> {
  name:T
  sayHello():T {
    return this.name
  }
}

let demo = new Demo<string>()


interface ResponseOK {
  data: object,
  code: number,
  message: string
}

function getData(): Promise<ResponseOK> {
  return Promise.resolve({
    data: {},
    code: 200,
    message: 'success'
  })
}


