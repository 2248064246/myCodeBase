# ImageDecoder

提供了一种解压缩和解码编码图像数据的方法

```js
/* 返回一个 ImageDecoder 实例 */
new ImageDecoder(init);
```

+ init
  + type: 图像MIME类型
  + data: 一个图像 BufferSource 或者 ReadableStream
  + desireWidth: 指示解码后的输出所需的宽度。
  + desireHeight: 指示解码后的输出所需的高度


**属性**
+ complete 返回一个布尔值, 表示数据是否完全缓冲
+ completed 返回一个 promise, 在数据完全缓冲后返回真
+ tracks: 只读属性返回编码图像数据中的轨道 (ImageTrack)列表


**方法**
+ close() 方法结束所有挂起的工作并释放系统资源。
+ decode(options) 解码指定位置的帧, 返回一个promise
  + options
    + frameIndex: 要解码的帧位置
  + 返回
    + image: VideoFrame对象, 表示解码的图像
    + complete: 一个布尔值，如果为真，表示图像包含最终的完整细节输出。
+ reset() 重置所有状态
## ImageTrack

**属性**
+ animated: 返回一个Boolean, 指示是否有多个帧(是否是动画)
+ frameCount: 返回轨道中的帧数
+ repetitionCount: 表示动画次数, 一般为`Infinity`
+ selected: 返回一个Boolean值, 表示是否选定当前track

**事件**
+ onchange 当 frameCount 变化时触发... (这个玩意能变???)