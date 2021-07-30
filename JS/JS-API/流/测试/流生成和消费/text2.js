/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-07-30 16:19:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 18:33:52
 * @Description: 
 */

let interval, i = 0

let writeStream = new WritableStream({
  start(controller) {

  },
  write(chunk, controller) {
    console.log(chunk)
  }
})

let writer = writeStream.getWriter()



interval = setInterval(() => {
  console.log('i', i)
  if (++i > 3) {
    clearInterval(interval)
    writer.close()
    writer.releaseLock()
  } else {
    writer.write(Math.floor(Math.random() * 10))
  }
}, 1000)


let readStream = new ReadableStream(
)


let reader = readStream.getReader()

let read = reader.read()

read.then(data => {
  console.log(data)
})