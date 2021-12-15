# 编码接口

提供了一种处理各种字符编码文本的机制

提供四个接口: TextDecoder, TextEncoder, TextDecoderStream, TextEncoderStream

## TextEncoder & TextDecoder

编码

```js
const textEncoder = new TextEncoder();

let encoded = textEncoder.encode(string); // 返回 Unit8Array
```

解码

```js
// 解码支持多种 TypeArray: Uint8Array, Int8Array, Uint16Array, Int16Array, and Int32Array.

// 这里默认解码格式是 utf-8, 也可以指定解码格式
let utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'

let u8arr = new Uint8Array([240, 160, 174, 183]);
let i8arr = new Int8Array([-16, -96, -82, -73]);
let u16arr = new Uint16Array([41200, 47022]);
let i16arr = new Int16Array([-24336, -18514]);
let i32arr = new Int32Array([-1213292304]);

console.log(utf8decoder.decode(u8arr));
console.log(utf8decoder.decode(i8arr));
console.log(utf8decoder.decode(u16arr));
console.log(utf8decoder.decode(i16arr));
console.log(utf8decoder.decode(i32arr));
```

指定解码格式 (MDN 关于字符编码格式的说明 https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings)

> 中文格式常用 `utf-8` 和 `gb2312`

```js
let win1251decoder = new TextDecoder('windows-1251');
let bytes = new Uint8Array([
  207, 240, 232, 226, 229, 242, 44, 32, 236, 232, 240, 33,
]);
console.log(win1251decoder.decode(bytes)); // Привет, мир!
```

## TextDecoderStream & TextEncoderStream

这两个一般和 fetch API 和 stream APi 有关
