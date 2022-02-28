# module_chunk_bundle

## 概念

webpack 将用 module 这个概念来分割代码

- 通过 import/require 引入的代码都是 module
- 异步引入`import()`等也是 module

从入口文件开始, webpack 会递归找出所有的 module, 这些module组合成一个chunk. 所以多个入口会有多个chunk. 

异步引入会形成单独的chunk

一个chunk对应一个最终的bundle
