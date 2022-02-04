/*
 * @Author: huangyingli
 * @Date: 2022-02-04 13:02:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-04 14:04:19
 * @Description:
 */

var MediaElementWrapper = require('mediasource');

const { Readable } = require('readable-stream');

var video = document.querySelector('video');
var wrapper = new MediaElementWrapper(video);
var writable = wrapper.createWriteStream(
  'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
);

writable.on('error', function (err) {
  // listening to the stream 'error' event is optional
});

let read = new Readable({
  read() {},
});

read.pipe(writable);

fetch('./官方示例/frag_bunny.mp4')
  .then((res) => res.body)
  .then((stream) => {
    console.log(stream, writable);
    console.log('开始')
    stream.pipeTo(chunkPush());
  });

function chunkPush() {
  return new WritableStream({
    write(chunk, ) {
      read.push(chunk)
    },
  });
}
