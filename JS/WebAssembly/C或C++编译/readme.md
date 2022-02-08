# c/c++ 编译

## 第一种方法

[mdn c/c++ 编译为 WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly/C_to_wasm)

有几点需要特别注意

Emscripten 的编译, mdn 上的文档已经完全过时, 需要看[官方文档内容](https://emscripten.org/docs/getting_started/downloads.html)

> win7 上屌问题一大堆

**window 下**

1. 先下载 CMake
2. 下载 Python(版本随意, 目前是 3)
3. `git clone https://github.com/juj/emsdk.git`
4. 可以给 `emsdk` 目录设置一个全局变量
5. `emsdk install latest` => `emsdk activate latest` => `在emsdk目录下执行 emsdk_env.bat`
6. `emcc hello.c -s WASM=1 -o hello.html` 这里注意需要在当前终端下进入 hello.c 文件所在目录

> 每一次需要使用 emcc, 都需要执行 第五步

**生成文件说明**

- `hello.wasm` 二进制的 wasm 模块代码
- `hello.js` 一个包含了用来在原生 C 函数和 JavaScript/wasm 之间转换的胶水代码的 JavaScript 文件
- `hello.html` 一个用来加载，编译，实例化你的 wasm 代码并且将它输出在浏览器显示上的一个 HTML 文件

> 这种生成方法直接将所有的东西都打包了, 并且会为你处理一些其他麻烦的东西

## 只生成 .wasm 文件, 手动加载

这个我们依然可以用 `emcc 命令`

通过用.js 取代.htm(l)作为文件后缀名，你就可以得到只有 JavaScript 的输出文件，而不再是完整的 HTML 文件。例如：emcc -o hello2.js hello2.c -O3 -s WASM=1. 你可以完全从零开始创建你自己的 HTML 文件。尽管如此，不推荐这样做。因为 Emscripten 需要大量的 JavaScript“胶水”代码从而能够 处理内存分配、内存泄漏以及大量的其他问题。这些问题都已经在提供的模板中得到了处理。使用模板要比自己编写模板要容易得多。不过，当对模板所做的事情越来越熟悉的时候，你就能够按照自己的需要创建定制化的模板了。

**还有一种更加简单的方法**

> 使用 https://mbebenita.github.io/WasmExplorer/ 在线编写 c/c++, 并生成 wasm 文件

### 调用 C 导出的函数

```c
#include <stdio.h>
#include <string.h>
#include <malloc.h>
// 这个库由 emsdk 工具包含
#include <emscripten.h>

/* 必须要这么写 */
char EMSCRIPTEN_KEEPALIVE *strcat_1(char *str1, char *str2) {
  char *t = (char *)malloc(strlen(str1) + strlen(str2)), *p=t;
  while((*p=*str1)) {
    str1++;
    p++;
  }
  while((*p=*str2)) {
    str2++;
    p++;
  }
  return(t);
}

int main() {
  char *s, s1[]="Good",s2[]="Bye";
  s = strcat_1(s1, s2);
  printf("字符串连接:%s\n", s);
}
```

**导出指令**
`emcc test.c -s WASM=1 -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']" -o test.js`

**JS 调用C函数**
```js
Module.ccall('strcat_1', 'string', ['string', 'string'], ['a', 'b']) 
// 结果 'ab'

/** 
 * 第一个参数是函数名
 * 第二个是函数返回值类型
 * 第三个是参数类型: Array格式
 * 第四个是参数数据
 */
```

