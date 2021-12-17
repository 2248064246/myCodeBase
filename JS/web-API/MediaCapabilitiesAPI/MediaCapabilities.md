# 媒体功能 API

用于检测设备是否支持指定媒体的播放, 是否能够流畅播放

## 用例

```js
if ('mediaCapabilities' in navigator) {
  const audioFileConfiguration = {
    type: 'file',
    audio: {
      contentType: 'audio/mp3',
      channels: 2,
      bitrate: 132700,
      samplerate: 5200,
    },
  };

  navigator.mediaCapabilities
    .decodingInfo(audioFileConfiguration)
    .then((result) => {
      console.log(
        'This configuration is ' +
          (result.supported ? '' : 'not ') +
          'supported, ' +
          (result.smooth ? '' : 'not ') +
          'smooth, and ' +
          (result.powerEfficient ? '' : 'not ') +
          'power efficient.'
      );
    })
    .catch(() => {
      console.log('decodingInfo error: ' + contentType);
    });
}
```

## 概念

有很多很多的视频和音频编解码器, 不同浏览器支持的程度不尽相同

借助媒体功能 API，开发人员可以确保每个用户都能知道他们的浏览器能够播放什么视频/音频

媒体功能 API 提供了比 MediaRecorder.isTypeSupported（）或 HTMLMediaElement.canPlayType（）更强大的功能，后者仅解决一般浏览器支持，而不是性能

该 API 还提供了访问显示属性信息的功能，例如支持的色域、动态范围功能以及有关播放的实时反馈。

## 参数说明

检测音频

```js
//Create a video configuration to be tested
const videoDecoderConfig = {
  /* file: 普通文件 */
  /* transmission: 以电子方式传送媒体。  */
  /* media-source: 源媒体数据  */
  /* record: 记录媒体(麦克风)  */
  type: 'file', // 'record', 'transmission', or 'media-source'
  audio: {
    /* 内容类型: 有效的音频MIME类型, https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs */
    contentType: 'audio/ogg',
    /* 音轨使用的声道数 */
    channels: 2,
    /* 用于对音频文件的一秒进行编码的位数 */
    bitrate: 132700,
    /* 构成音频文件一秒钟的音频样本数 */
    samplerate: 5200,
  },
};
```

检测视频

```js
//Create a video configuration to be tested
const videoDecoderConfig = {
  type: 'file', // 'record', 'transmission', or 'media-source'
  video: {
    contentType: 'video/webm;codecs=vp8', // valid content type
    /* 视频的宽度 */
    width: 1920, 
    /* 视频的高度 */
    height: 1080, 
    /* 用于对视频文件的一秒进行编码的位数 */
    bitrate: 10000,
    /* 构成视频播放一秒钟的帧数 */
    framerate: 30, 
  },
};
```



