# string 的操作

string 很常见的操作就是转 base64, 以及反序列化

什么是 base64? 详见 webCrypto 里关于 base64 的介绍

string 要转为 base64s 首先要做的就是转为 buffer, 然后根据 base64 规范定义, 将 buffer 编码为对应字符

## string to buffer

在 web 端, string 要转 buffer 有以下方法:

1. 使用 TextEncode
2. 使用 Blob 和 FileReader
3. 通过 charCodeAt 或者 codePointAt 来获取字符码点然后转为二进制存入

### 使用 TextEncode

> 关于这个编码和解码, 默认使用的是 `utf-8` 格式

```js
// TextEncoder 支持chrome 38+, 要兼容请查看 polyfill文件
// 支持特殊字符
function str2buffer(str) {
  return new TextEncoder().encode(str).buffer; // 返回的是 Unit8Array
  // 默认是用 utf8
}

function buffer2str(buffer) {
  return new TextDecoder().decode(buffer); // 返回 string
}
```

### 使用 Blob 和 FileReader

```js
// 这种方案支持到 IE 10, 并且支持特殊字符
function str2buffer(str, cb) {
  var b = new Blob([str]);
  var f = new FileReader();
  f.onload = function (e) {
    cb(e.target.result);
  };
  f.readAsArrayBuffer(b);
}

function buffer2str(buffer, cb) {
  var f = new FileReader();
  f.onload = function (e) {
    cb(e.target.result);
  };
  f.readAsText(new Blob([buffer]));
}
```

### 使用 String 上面的方法获取

> 需要 ES6+, 支持 emoji

```js
let str = '🙃 123❤️';
/* 治理需要使用 Uint32Array 来存储 emoji 等表情字符 */
/* 字节长度需要 扩大四倍 */

const buf = new ArrayBuffer(str.length * 4);
const bufView = new Uint32Array(buf);
let i = 0;
/* 这里 for...of 虽然可以遍历 四字节表情, 但是对于一些特殊表情无能为力 */

for (let s of str) {
  console.log(s, s.codePointAt());
  bufView[i] = s.codePointAt();
  i++;
}

console.log(buf);

const asStr = String.fromCodePoint.apply(null, new Uint32Array(buf));

console.log(asStr);
```

## string to base64

1. 使用 btoa() + encodeURIComponent() 方法
2. 使用 btoa() + TextEncoder 方法

### 使用 encodeURIComponent()

> 为了处理特殊表情, 先进行 URI 编码, 然后转 base64

> 这样转出来的 base64 并不是通用的, 无法通过标准第三库解析

```js
function base64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function base64Decode(base64) {
  return decodeURIComponent(atob(base64));
}
```

### 使用 TextEncode

> 注意这种方法也是非标准的, 对于非 emoji 可以得到标准结果

> 处理 emoji 的另一个思路是: 先使用 TextEncode 编码为 buffer, 然后使用 chrCodeAt 先读取(此时会有乱码), 最后使用 btoa 将这个乱码字符转为 base64

> 反转的时候: 先 atob, 得到乱码, 将乱码转为 buffer, 最后使用 TextDecode 解码

```js
function strToUTF8Arr(str, encodeType = 'utf-8') {
  return new TextEncoder(encodeType).encode(str);
}

function bufferToStr(buffer, decodeType = 'utf-8') {
  return new TextDecoder(decodeType).decode(buffer);
}

function base64Encode(str) {
  let unit8Ary = strToUTF8Arr(str);
  return window.btoa(String.fromCharCode.apply(null, unit8Ary));
}

function base64Decode(base64) {
  let str = window.atob(base64);
  let unit8Ary = new Uint8Array(str.length);
  Array.prototype.forEach.call(unit8Ary, function (el, idx, arr) {
    arr[idx] = str.charCodeAt(idx);
  });
  return bufferToStr(unit8Ary.buffer);
}
```

> 更多方法查看 webCrypto

## hashCode

> 将 string 转为唯一的 数值, 然后通过这个数值快速定位数据位置, 这就是 hashMap

string -> 数值的转换也称为`散列算法`

一般来说这个 hashCode 为 `0~2^32` 之间

关于散列算法, 查看`加密章节` 或 `字典和散列章节`


