# 视频帧

VideoFrame 表示视频的一帧

## 如何得到视频帧

- 通过 `MediaStreamTrackProcessor` 将轨道转为视频帧流
- 通过 `VideoFrame` 构造函数, 从 `CanvasImageSource` 获取帧

同时通过`MediaStreamTrackGenerator` 可以将帧转为轨道

## VideoFrame

```js
let frame = new VideoFrame(image, init);
let frame = new VideoFrame(data, init);
```

- image: CanvasImageSource 类型元素
  - HTMLImageElement
  - SVGImageElement
  - HTMLVideoElement
  - ImageBitmap
  - OffscreenCanvas
- init
  - duration: 表示帧持续时间(单位ms)
  - timestamp: 表示帧的时间戳(单位ms)
  - 

- data: 一个包含 VideoFrame 的 ArrayBuffer 数据
- init
  - format 表示视频像素格式的字符串。以下字符串之一，
    - "I420"
    - "I420A"
    - "I422"
    - "I444"
    - "NV12"
    - "RGBX"
    - "RGBA"
    - "BGRA"
    - "BGRX"
  - timestamp
  - duration
  - codedWidth
  - codedHeight
  
