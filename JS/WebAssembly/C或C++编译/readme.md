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

**生成文件说明**

- `hello.wasm` 二进制的 wasm 模块代码
- `hello.js` 一个包含了用来在原生 C 函数和 JavaScript/wasm 之间转换的胶水代码的 JavaScript 文件
- `hello.html` 一个用来加载，编译，实例化你的 wasm 代码并且将它输出在浏览器显示上的一个 HTML 文件

> 这种生成方法直接将所有的东西都打包了, 并且会为你处理一些其他麻烦的东西

## 只生成 .wasm 文件, 手动加载

这个我们依然可以用 `emcc 命令`

通过用.js 取代.htm(l)作为文件后缀名，你就可以得到只有 JavaScript 的输出文件，而不再是完整的 HTML 文件。例如：emcc -o hello2.js hello2.c -O3 -s WASM=1. 你可以完全从零开始创建你自己的 HTML 文件。尽管如此，不推荐这样做。因为 Emscripten 需要大量的 JavaScript“胶水”代码从而能够 处理内存分配、内存泄漏以及大量的其他问题。这些问题都已经在提供的模板中得到了处理。使用模板要比自己编写模板要容易得多。不过，当对模板所做的事情越来越熟悉的时候，你就能够按照自己的需要创建定制化的模板了。


**还有一种更加简单的方法**
> 使用 https://mbebenita.github.io/WasmExplorer/ 在线编写c/c++, 并生成 wasm 文件


