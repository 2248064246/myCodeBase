# Web Audio API

Web Audio API 提供了在 Web 上控制音频的一个非常有效通用的系统，允许开发者来自选音频源，对音频添加特效，使音频可视化，添加空间效果 （如平移），等等。

## BaseAudioContext

**属性**

- currentTime 返回一个双精度值，表示用于调度的不断增加的硬件时间（以秒为单位）。它从 开始。0
- destination 该节点表示上下文中所有音频的最终目标。它可以被认为是音频渲染设备。
- listener 返回 AudioListener 对象，用于 3D 空间化。
- sampleRate 返回一个浮点数，该浮点数表示此上下文中所有节点使用的采样率（以每秒样本数为单位）。音频上下文的采样率无法更改。
- state 返回当前状态

**事件**

- onstatechange

**方法**

> 还实现了 EventTarget 中方法

- createBuffer() 创建一个新的空 AudioBuffer 对象，然后可以使用数据填充该对象并通过 AudioBufferSourceNode 播放该对象。
- createConstantSource() 创建一个 ConstantSourceNode （en-US） 对象，该对象是连续输出单声道（单声道）声音信号的音频源，其样本都具有相同的值。
- createBufferSource() 创建 AudioBufferSourceNode，该节点可用于播放和操作 AudioBuffer 对象中包含的音频数据。
- createScriptProcessor() 创建一个 ScriptProcessorNode，它可用于通过 JavaScript 进行直接音频处理。
- createStereoPanner() 创建 StereoPannerNode （en-US），该节点可用于将立体声平移应用于音频源。
- createAnalyser() 创建 AnalyserNode，该节点可用于显示音频时间和频率数据，例如用于创建数据可视化
- createBiquadFilter() 创建一个 BiquadFilterNode，它表示可配置为几种不同的常见滤波器类型的二阶滤波器：高通、低通、带通等。
- createChannelMerger() 创建 ChannelMergerNode，用于将来自多个音频流的通道合并到单个音频流中。
- createChannelSplitter() 创建 ChannelSplitterNode （en-US），用于访问音频流的各个通道并单独处理它们。
- createConvolver() 创建一个 ConvolverNode，该节点可用于将卷积效果应用于音频图，例如混响效果
- createDelay() 创建一个 DelayNode （en-US），用于将传入的音频信号延迟一定量。此节点还可用于在 Web 音频 API 图中创建反馈循环。
- createDynamicsCompressor() 创建动态压缩器节点，该节点可用于将声音压缩应用于音频信号。
- createGain() 创建 GainNode，可用于控制音频图形的整体音量。
- createIIRFilter() 创建一个 IIRFilterNode （en-US），它表示可配置为几种不同的常见滤波器类型的二阶滤波器。
- createOscillator() 创建振荡器节点，表示周期性波形的源。它基本上生成一个音调。
- createPanner() 创建一个 PannerNode （en-US），用于在 3D 空间中对传入的音频流进行空间化。
- createPeriodicWave() 创建周期波，用于定义可用于确定振荡器节点输出的周期性波形。
- createWaveShaper() 创建一个波形阴影节点，用于实现非线性失真效果。
- decodeAudioData() 异步解码 ArrayBuffer 中包含的音频文件数据。在这种情况下，ArrayBuffer 通常在将 设置为 后从 XMLHttpRequest 的属性加载。此方法仅适用于完整的文件，而不适用于音频文件的片段。

## AudioContext

> 所有的音频操作都需要一个音频上下文, 继承自 BaseAudioContext

**方法**

- close() 关闭一个音频环境, 释放任何正在使用系统资源的音频
- createMediaElementSource() 关联 HTMLMediaElement, 这可以用来播放和处理来自 video 或 audio 的音频
- createMediaStreamSource() 关联可能来自本地计算机或麦克风的音频流 MediaStream
- createMediaStreamDestination() 关联可能存储在本地或已发送到其他计算机的 MediaStream 流
- createMediaSteamTrackSource() 与一个 MediaStream 关联, 表示一个媒体流轨迹
- getOutputTimestamp() 对象包含两个与当前音频上下文相关的音频时间戳
- resume() 恢复之前被暂停的音频上下文中的时间进程
- suspend() 暂停音频上下文中的时间进程，暂停音频硬件访问并减少进程中的 CPU/电池使用。

**使用方式**

```js
/* 兼容性处理 */
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
```

## AudioNode

AudioNode 接口是一个处理音频的通用模块, 比如一个音频源 (e.g. 一个 HTML <audio> or <video> 元素), 一个音频地址或者一个中间处理模块 (e.g. 一个过滤器如 BiquadFilterNode, 或一个音量控制器如 GainNode).

一个 AudioNode 既有输入也有输出。输入与输出都有一定数量的通道。只有一个输出而没有输入的 AudioNode 叫做音频源。

处理多个 AudioNode 时，一般来说, 一个模块读取它的输入，做一些处理。后输出新生成的结果。

不同的模块可以连接在一起构建一个处理图。 这样一个处理图包含 AudioContext。 每个 AudioNode 只有一个这样的上下文。
