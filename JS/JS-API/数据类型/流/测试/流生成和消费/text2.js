/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-01 08:36:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-01 09:16:00
 * @Description: 
 */

// 要自己创建流并且能够读取, 需要用到 TransformStream

let {
  writable,
  readable
} = new TransformStream({
  transform(chunk, controller) {
    // 这里对 readable 写入的 chunk 做处理
    controller.enqueue(new TextEncoder().encode(chunk))
  }
})

let writer = writable.getWriter()
let reader = readable.pipeThrough(new TextDecoderStream()).getReader()

writer.write('你好')

reader.read().then(data => { // 每次读取都需要调用 read() 方法
  console.log(data)
})