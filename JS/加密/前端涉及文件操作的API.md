
# 前端涉及文件操作的API

## URL
> URL 对象可以用于解析url 字符串, 也可以将一个Blob转为使用 url引用

> 示例: http://www.baidu.com:80/abc?nme=Tom#token  
  + 属性
    + protocol => http: (带有':')
    + hostname => www.baidu.com
    + port     => :80 
    + userName => ''
    + password => ''
    + pathname => '/abc' (带有 '/')
    + search   => '?name=Tom' (带有 '?')
    + hash     =>  '#token' (带有 #)
    + href     => 返回完整的url
    + origin   => 返回 protocol + hostName
    + searchParams
      + 这是一个用于控制查询参数的对象
        + append()
        + get()
        + set()
        + getAll()
        + has()
        + keys()
        + values()
        + forEach()
        + delete()
        + toString()
  + 方法
     + toString() 
     + toJson()
  + 静态方法
     + createObjectURL() 
       + 返回一个 blob URL, 这个url执行浏览器中一个blob或者file 的内存地址
     + revokeObjectURL()
       + 清除blob URL
  ```javaScript
    new URL('www.baidu.com')
  ```
## Blob

```javaScript
  new Blob(array, options) //
  // array 可以是 Array, ArrayBuffer, ArrayBufferView, Blob
  // options
  //    type
  //    endings

  // 属性
  // type: MIME
  // size: Bytes
```

## File

## FileReader

## ArrayBuffer
+ 位, 字节, 字
  + 位(bits) 是最小存储单位, 每一位存储一个二进制码
  + 一个字节(Bytes)由8位组成
  + 而字(words)通常为16,32或者64个位组成
+ 一个16进制数由4位二进制表示
+ 单位关系
  + 1 Byte = 8bit
  + 1 KB = 1024 B
  + 1 MB = 1024 KB
  + 1GB = 1024 MB
  + ... 
## TypedArray
+ Uint(8|16|32)Array
+ int(8|16|32)Array

## DataView

## TextDecoder
> 文本解码器, 将 ArrayBuffer 解码为文本

## TextEncoder
> 文本编码器, 将 文本 编码为 ArrayBuffer