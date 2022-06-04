

# URL

> 用于处理 url 信息


注意 IE 环境不支持


## 使用


详细见 `JS/加密/前端涉及文件操作的API.md`

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