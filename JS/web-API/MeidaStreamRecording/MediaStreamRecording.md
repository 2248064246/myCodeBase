# MediaStream Recording API

媒体记录 API, 用于保存媒体流

MediaStream Recording API 由一个主接口 MediaRecorder 组成，这个接口负责的所有工作是从 MediaStream 获取数据并将其传递给你进行处理。数据通过一系列 dataavailable 事件传递，这些数据已经成为你创建 MediaRecorder 时所声明的格式。然后，您可以进一步处理数据，或者根据需要将其写入文件。

## 使用

```js
/* 目前录制支持支 video/webm 格式 */
var options = { mimeType: 'video/webm; codecs=vp9' };
mediaRecorder = new MediaRecorder(mediaStream, options);

/* 数据可用时会触发这个监听 */
mediaRecorder.ondataavailable = handleDataAvailable;
/* 开启监听 */
mediaRecorder.start();

var recordedChunks = [];
function handleDataAvailable(event) {
  console.log('data-available');
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    console.log(recordedChunks);
  } else {
    // ...
  }
}

/* 停止记录 */
mediaRecorder.stop();

mediaRecorder.onstrop = () => {
  /* 可以在这里出阿里记录的数据, 例如下载下来 */
  var blob = new Blob(recordedChunks, {
    type: 'video/webm',
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'test.webm';
  a.click();
  window.URL.revokeObjectURL(url);
};

/* 停止录制 */
mediaRecorder.pause()

mediaRecorder.onpause() {}

/* 恢复录制 */
mediaRecorder.resume()

mediaRecorder.onresume()


```

## 属性和方法

构造函数 `MediaRecorder`

构造函数的 `options` 参数

- mimeType: 指定录制内容的 MIME 类型
- audioBitsPerSecond: 指定音频比特率 (128000 为 128Kpbs)
- videoBitsPerSecond: 指定视频比特率 (2500000 为 2.5Mbps)
- bitsPerSecond: 指定音频和视频比特率

> 如果视频和/或音频的比特率没有指定, 视频默认采用的比特率是 2.5Mbps, 但音频的默认比特率并不固定, 音频的默认比特率根据采样率和轨道数自适应.

**静态属性和方法**

- MediaRecorder.isTypeSupported(mimeType) 返回一个 Boolean, 来表示设置的 MIME 类型是否被支持

**实例属性和方法**

- mimeType 返回实例创建时选择的 MIME 类型
- state 返回当前录制状态 (inactive: 闲置中, recording: 录制中, paused: 暂停)
- stream 返回录制的 MediaStream
- ignoreMutedMedia 指定是否录制无声的输入源, 默认为 false, 允许录制无声或黑屏视频
- videoBitsPerSecond 返回视频编码比特率(可能和设置的不一致)
- audioBitsPerSecond 返回音频编码比特率(可能和设置的不一致)

- pause() 暂停
- resume() 恢复
- stop() 停止
- start() 开始
- requestData() 请求一个从开始到当前接收到的,存储为 Blob 类型的录制内容. (或者是返回从上一次调用 requestData() 方法之后到现在的内容). 调用这个方法后,录制将会继续进行,但是会创建一个新的 Blob 对象

**事件处理**

- ondataavailable 该事件可用于获取录制的媒体资源 (在事件的 data 属性中会提供一个可用的 Blob 对象.)

* onerror 用来处理记录错误事件，包括报告媒体记录中出现的错误。
* onpause
* onresume
* onstart
* onstop

## 检查浏览器支持的录制格式

```js
var types = [
  'video/webm',
  'audio/webm',
  'video/webm;codecs=vp8',
  'video/webm;codecs=daala',
  'video/webm;codecs=h264',
  'audio/webm;codecs=opus',
  'video/mpeg',
  'video/mp4;codecs="avc1.42E01E,mp4a.40.2"',
];

for (var i in types) {
  console.log(
    'Is ' +
      types[i] +
      ' supported? ' +
      (MediaRecorder.isTypeSupported(types[i]) ? 'Maybe!' : 'Nope :(')
  );
}
```
