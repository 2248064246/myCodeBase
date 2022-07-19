# Blob File Base64 ArrayBuffer 之间的转换

## base64文件(dataURI) 转为 File 类型
> 适用于需要上传File类型的文件, 而拿到的是base64字符串格式文件

> 例如 `jspdf` 生成的文件上传后端

```javascript
  /**
 * 将 base64 格式文件(dataURI) 转为 File
 * @param {String} dataurlstring base64格式的文件
 * @param {String} filename 文件名
 * @returns {File} 文件对象
 */
export function dataURItoFile(dataurlstring, filename = 'file') {
  let arr = dataurlstring.split(',');
  let hasFilename = arr[0].indexOf('filename') > -1
  if (hasFilename) {
    let name = arr[0].match(/filename=(.*?);/)[1]
    filename = name.split('.')[0]
  }
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split('/')[1];
  let bstr = atob(arr[1]); // 解码base64字符串, btoa() 将文字转为base64(不支持中文, 支持支 ASCII)
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  });
}

```

## 将 base64文件(dataURI) 转 blob
```javascript
function dataURItoBlob(dataURI) {  
  var byteString = atob(dataURI.split(',')[1]);  
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];  
  var ab = new ArrayBuffer(byteString.length);  
  var ia = new Uint8Array(ab);  
  for (var i = 0; i < byteString.length; i++) {  
      ia[i] = byteString.charCodeAt(i);  
  }  
  return new Blob([ab], {type: mimeString});  
}
```

## 将 File 转为 base64文件 | blob | ArrayBuffer (支持IE10)

```javaScript
var file = '' // base64字符串
var reader = new FileReader();
reader.readAsDataURL(file)
reader.onload = (e) => {
  console.log(e.target.result)
}
// 还有 onerror 事件

```
> FileReader 还支持 `readAsBinaryString`, `readAsArrayBuffer`

## 将 blob | ArrayBuffer 转 File
```javascript
  new File(Blob|ArrayBuffer, filename, {type: fileMIME})
```



## 将 `Blob` 流文件通过新窗口打开
> 主要针对 pdf 文件的预览

```javaScript
  var binaryData = [];
  binaryData.push(blob); // 将流文件推入数组

  this.url = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
  // 生成可以直接打开的 url 路径

  window.open(this.url, '_blank', { height: 627, width: 887 })
  // 指定打开窗口的宽高
```

## Buffer ArrayBuffer Unit8Array Unit16Array Unit32Array  Blob File 关系

![关系图](https://pic2.zhimg.com/80/v2-ed143b043805e01fbbea5712c7e27789_720w.jpg)
 
  + Blob 
    + 前端的一个专门用于支持文件操作的二进制对象
    + 文件下载 (通过 a 标签)
      + 已知文件 `url` 地址
        ```javaScript
        // 创建a标签
        let a = document.createElement('a')
        // 定义下载名称
        a.download = '文件名称'
        // 隐藏标签
        a.style.display = 'none'
        // 设置文件路径
        a.href = 'https://.../158ac1e6917445a4aa384a2a7209445a.xlsx'
        // 将创建的标签插入dom
        document.body.appendChild(a)
        // 点击标签，执行下载
        a.click()
        // 将标签从dom移除
        document.body.removeChild(a)
        ``` 
      + 通过 `window.URL.createObjectURL()` 将Blob对象转为一个 `URL`, 然后将这个 `url` 赋值给 `a` 标签的 `href`属性, 同和配合`a.download` 属性写上文件名
        ```html
          <!-- html部分 -->
          <a id="h">点此进行下载</a>
          <!-- js部分 -->
          <script>
            var blob = new Blob(["Hello World"]);
            var url = window.URL.createObjectURL(blob);
            var a = document.getElementById("h");
            a.download = "helloworld.txt";
            a.href = url;
          </script> 
        ``` 
      +   通过 `FileReader.readAsDataURL()` 将Blob或者File转为base64, 赋值给 `a.href` 实现下载
          ```javaScript
            // 创建FileReader实例
            const reader = new FileReader()
            // 传入被读取的blob对象
            reader.readAsDataURL(blobContent)
            // 读取完成的回调事件
            reader.onload = (e) => {
              let a = document.createElement('a')
              a.download = file.fileName
              a.style.display = 'none'
              // 生成的base64编码
              let url = reader.result
              a.href = url
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            }
          ```  
    + 图片|pdf 显示
      + 通过 `window.URL.createObjectURL()` 生成 URL, 可以用于 src 属性预览, 也可以用于 window.open 打开新窗口预览
    + 资源分段上传
      + Blob 拥有一个 `slice` 属性, 可以将blob 裁减为多段, 分开上传
  + File 
    + 文件对象, 继承自Blob, 拥有Blob所有功能
    + 能够得到 File 对象的方式 
      + `new File(bits, filename, options)` 可以将 `blob`, `arrayBuffer` 等转为文件对象 (`chrome 38+`)
        + options 参数
          + type: 文件MIME类型
          + lastModify: 时间戳(默认`Date.now()`)
  + ArrayBuffer
    + 用来表示一个通用的、固定长度的二进制数据缓冲区, 不能直接操作ArrayBuffer
      + 通过`FileReader.readAsArrayBuffer` 将File, Blob 对象转为ArrayBuffer
    + 操作ArrayBuffer方式
      + 通过 `DataView`对象来进行操作
        ```javaScript
          const buffer = new ArrayBuffer(16);
          const view = new DataView(buffer);
          view.setInt8(2, 42);
          console.log(view.getInt8(2));
        ```
      + 通过 `TypeArray`对象进行操作
        ````javaScript
          const typedArray1 = new Int8Array(8);
          typedArray1[0] = 32;

          const typedArray2 = new Int8Array(typedArray1);
          typedArray2[1] = 42;

          console.log(typedArray1);
          //  output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]

          console.log(typedArray2);
          //  output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]
        ``` 
  + Buffer
    + Node.js 提供的一个二进制缓冲区, 冲用来 I/O 操作, 浏览器没有这个类
    + 一般用于接收数据, 并将数据整合
    + ![buffer](https://pic1.zhimg.com/80/v2-93aae2f807bf379e2749db194047ada4_720w.jpg)

  + 其实 Buffer 和 ArrayBuffer 是一样的, Buffer对应Node环境, ArrayBuffer 对应浏览器环境
  + Unit8Array Unit16Array Unit32Array ... 都是JS的类型化数据, 用来操作二进制数据
    + 类型数据架构: 缓冲 和 视图
      + 缓冲指的是 ArrayBuffer, 它用于存储二进制数据, 缓冲没有格式可言
      + 视图提供了上下文--即数据类型, 起始偏移量和元素数

## 将 string 和 ArrayBuffer 互转

> 方案 1 => 使用 charCodeAt

  ```javaScript
    // 这个方法支持支 ASCII 字符, 存在特殊字符, 中文不要用
    // 要去重温一下node的buffer操作
    function str2buffer(str) {
      // new Blob([str]).size
      const buf = new ArrayBuffer(str.length);
      const bufView = new Uint8Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
        // charCodeAt 是 0-65535 的 UTF-16 code
        // 推荐使用 codePointAt, 但是 codePoint 只支持 chrome 41+
        // 要使用请看 codePointAt 的 polyfill
        // (其实用 codePointAt 也是没有意义的, Unit8Array 支持 0-255)
      }
      return buf;
    }

    function buffer2str(buffer) {
      const asStr = String.fromCharCode.apply(null, new Uint8Array(buffer))
      return asStr
    }

  ```

> 方案2 => 使用 TextDecoder TextEncoder

  ```javaScript
    // TextEncoder 支持chrome 38+, 要兼容请查看 polyfill文件
    // 支持特殊字符
    function str2buffer(str) {
      return new TextEncoder().encode(str).buffer // 返回的是 Unit8Array
      // 默认是用 utf8
    }

    function buffer2str(buffer) {
      return new TextDecoder().decode(buffer) // 返回 string
    }
  ```

> 方案3 => 使用 FileReader API

  ```javaScript
    // 这种方案支持到 IE 10, 并且支持特殊字符
    function str2buffer(str, cb) {
        var b = new Blob([str]);
        var f = new FileReader();
        f.onload = function(e) {
            cb(e.target.result);
        }
        f.readAsArrayBuffer(b);
    }

    function buffer2str(buffer, cb) {
      var f = new FileReader();
      f.onload = function(e) {
            cb(e.target.result);
      }
      f.readAsText(new Blob([buffer]));
    }
  ```


## 单纯 Base64 字符 和 ArrayBuffer 互转
> 如果没有特殊字符, 可以使用 btoa, atob API

> 建议使用 js-base64 标准库

```javaScript
  // 思路: 先将base64转为string, 然后将string转为ArrayBuffer
  function base64ToBuffer(base64) {
    return str2buffer(atob(base64))
    // atob() 方法兼容 IE10
    
  }

  // 思路: 先将buffer转string, 再将string转base64
  function bufferToBase64(buffer) {
    return btoa(buffer2str(buffer))
    // btoa 不支持比较特殊字符, 不支持中文
    // 只对 ASCII 码支持
  }
```

> 为了支持中文字符串和特殊字符, 有一种变种方式是使用 decodeURIComponent 的 encodeURIComponent 先将字符串转为 URI 编码,  然后在将 URI 编码转为 base64 (URI编码是% + 16进制形式)

```javaScript

  function base64ToBuffer(base64) {
    return str2buffer(decodeURIComponent(atob(base64)))
  }

   function bufferToBase64(buffer) {
    return btoa(encodeURIComponent(buffer2str(buffer)))
  }

```

> 还有一种方式是使用 16位 UnitArray 来编码数据, 然后再转为 8位UnitArray

> 源自 MDN atob API

```javaScript

  function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
  }

  function fromBinary(binary) {
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
  }

  // 这两个方法在 str2buffer 和 buffer2str 里面也是有用的, 科室解决特殊字符问题

  let binaryStr = toBinary('〼卐☛')
  let base64Str = btoa(binaryStr)

  let str = fromBinary(atob(base64Str))

```

> 上述这些编码方式都有局限性, 都只能算是私有协议, 不共用

> 使用 FileReader API的 readAsDataURL 只获取base64部分, 这种方法获取的base64字符串在js-base64中也能解码

```javaScript
  function str2base64 (string, cb) {
    var reader = new FileReader()
    reader.onload = () => {
      var base64 = reader.result.split(',')[1]
      cb(base64)
    }
    reader.readAsDataURL(new Blob([string]))
  }

  // 但问题是如何使用原生 JS API 解码呢??
  // 还是推荐使用 js-base64 来做base64处理
```

## 16进制数 和 ArrayBuffer 互转

```javaScript

  buffer2hex(buffer) {
    const hex = Array.from(new Uint8Array(buffer))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');
    return hex;
  }

  hex2buffer(hex) {
    const typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    return typedArray.buffer
  }

```
