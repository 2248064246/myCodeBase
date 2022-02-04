/*
 * @Author: huangyingli
 * @Date: 2022-02-04 13:02:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-04 20:58:04
 * @Description:
 */

var MediaElementWrapper = require('mediasource');

const { Readable } = require('readable-stream');

var video = document.querySelector('audio');
// var wrapper = new MediaElementWrapper(video);
// var writable = wrapper.createWriteStream('audio/mpeg;');

const visualize  = require('../../音频可视化效果/六边形方块很炫')

// writable.on('error', function (err) {
//   // listening to the stream 'error' event is optional
//   console.error(err);
// });

let read = new Readable({
  read() {
    console.log('read');
  },
});

// read.pipe(writable);

// fetch('../陈奕迅-《孤勇者》 mp3音乐免费下载.mp3')
//   .then((res) => res.body)
//   .then((stream) => {
//     console.log(stream, writable);
//     console.log('开始');
//     // read.read();
//     stream.pipeTo(chunkPush());
//   });

function chunkPush() {
  return new WritableStream({
    write(chunk) {
      console.log('chunk', chunk);
      read.push(chunk);
    },
  });
}

video.oncanplay = function () {
  console.log('可以播放了');
  // a();
  // video.play();
};

video.onplaying = function () {
  a();
};

function a() {
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  let analyser = audioCtx.createAnalyser();
  let gainNode = audioCtx.createGain();

  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  let source = audioCtx.createMediaElementSource(video);

  console.log(source);

  source.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioCtx.destination);
  visualize(analyser)
}
