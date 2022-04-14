# 视频编码器和视频解码器

## 视频编码器

```js
const videoEncoder = new VideoEncoder(init);
```

- init
  - output: function(chuck, decoderconfig)
    - chunk 是视频每帧的数据
    - decoderconfig: 视频元数据
      - codec: 编解码字符串
      - description
      - codedWidth: 表示 VideoFrame 的宽度(px)
      - codeHeight: 表示 VideoFrame 的高度(px)
      - displayAspectWidth
      - displayAspectHeight
      - hardwareAcceleration 为此编解码器配置硬件加速的字符串
        - no-preference
        - prefer-hardware 软解
        - prefer-software 硬解
      - optimizeForLatency
  - error: function 错误回调

**属性**

- encodeQueueSize 属性返回队列中挂起的编码请求数。
- state: 属性返回基础编编码码器的当前状态。
  - unconfigured: 未配置解码
  - configured: 编解码器具有有效的配置并已准备就绪
  - closed: 编解码器不再可用，并且系统资源已释放。

**方法**

- configure(config)
  - config
    - codec
    - width: 代表输出的视频帧宽度(px)
    - height
    - displayWidth: 一个整数，表示显示时每个输出 EncodedVideoChunk 的预期显示宽度，单位为像素。
    - displayHeightOptional
    - hardwareAcceleration 加速方式
      - "no-preference"
      - "prefer-hardware"
      - "prefer-software"
    - framerate 帧速率
    - bitrate 一个整数，包含编码后的视频的平均比特率，单位为每秒比特。
    - latencyMode: 表示延迟行为
      - quality 质量为主 (默认)
      - realtime 实时性为主
    - bitrateMode 比特率模式
      - constant 绝对值
      - variable 根据性能调整(默认)
- encode(frame, options)
  - frame: 视频帧
  - options
    - keyFame
      - 如果为 false, 则不设置关键帧
      - 如果为 true, 则当前帧会被编码为关键帧
- flush() 返回一个 promise, 如果所有数据编码完成则返回 true
- close() 结束所有挂起的工作并释放资源
- reset() 重置所有状态，包括配置、控制消息队列中的控制消息和所有挂起的回调。

## 视频解码器

```js
let decoder = new VideoDecoder(init);
```

+ init
  + output: function(frame)
  + error: function

**属性**

- decodeQueueSize: 一个整数, 表示解码队列请求数 (如果这个数过大, 说明电脑性能跟不上)
  - 在这个数值过大时, 可以丢弃一部分帧, 减缓处理器压力
- state: 属性返回基础编解码器的当前状态。
  - unconfigured: 未配置解码
  - configured: 编解码器具有有效的配置并已准备就绪
  - closed: 编解码器不再可用，并且系统资源已释放。

**方法**

- configure(config) 配置视频解码器
  - config
    - codec
    - description: 不知到干嘛的, 一般不配置
    - codedWidth: 视频帧宽度(px)
    - codedHeight: 视频帧高度(px)
    - hardwareAcceleration: 关于使用硬件加速方法的提示
      - "no-preference"
      - "prefer-hardware"
      - "prefer-software"
    - colorSpace 色彩空间, 一个对象, 包含以下值
      - matrix: 不知道干嘛的, 一般不设置
        - "rgb"
        - "bt709"
        - "bt470bg"
        - "smpte170m"
      - transfer: 表示传输特征的字符串 (不知道干嘛的)
        - "bt709"
        - "smpte170m"
        - "iec61966-2-1"
      - primaries: 表示视频样本的色域的字符串(不知道干嘛的)
        - "bt709"
        - "bt470bg"
        - "smpte170m"
    - optimizeForLatency: 一个布尔值。如果为真，这是一个提示，选择的解码器应该优化，以最小化 EncodedVideoChunk 对象的数量，必须在视频帧输出之前进行解码。(不知道干嘛的)
- decode(chunk) 解码给定的视频块
- flush()
- reset()
- close()
