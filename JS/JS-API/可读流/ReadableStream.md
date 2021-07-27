

# ReadableSteam

流操作API接口呈现了一个可读取的二进制流操作

JavaScript以编程的方式访问通过网络接收的数据流，并根据开发人员的需要处理它们 (这在以前是无法做到的)

## 概念和用法

流将你希望通过网络接收的资源拆分成小块，然后按位处理它。这正是浏览器在接收用于显示web页面的资源时做的事情——视频缓冲区和更多的内容可以逐渐播放，有时候随着内容的加载，你可以看到图像逐渐地显示。

[MDN Steam](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API)

## 可读流

### 构造函数

ReadableStream() 创建并从给定的 Handler 返回一个可读流对象。

### 属性

locked 表示这个可读流是否被读取器锁定

### 方法

+ cancel() 取消读取流, 可以传入 reason 参数表示取消原因, 这个原因将传给调用方
+ getReader() 创建一个读取器并将流锁定于其上, 其他读取器将不能读取这个流, 知道它被释放
+ getIterator() 创建一个异步的 ReadableStream 迭代器并将流锁定于其上。一旦流被锁定，其他读取器将不能读取它，直到它被释放。
+ pipeThrough() 提供将当前流管道输出到一个 transform 流或 writable/readable 流对的链式方法
+ pipeTo() 将当前 ReadableStream 管道输出到给定的 WritableStream，并返回一个 promise，输出过程成功时返回 fulfilled，在发生错误时返回 rejected。
+ tee() tee 方法（tee本意是将高尔夫球放置在球座上）tees 了可读流，返回包含两个ReadableStream 实例分支的数组，每个元素接收了相同的传输数据。


## l