# js 压缩

## Uglifyjs

```shell
npm install uglify-js
```

```shell
uglifyjs file -o outputFile
```

需要特别注意的几个参数

| 参数             | 说明                                |
| ---------------- | ----------------------------------- |
| -o               | 输入文件名                          |
| -m               | 混淆变量                            |
| --mangle-props   | 混淆变量的属性名称                  |
| -b               | 代码格式化(属实没什么用)            |
| --comments       | 'all' 保留所有注释                  |
| --no-annotations | 忽略所有注释(/\*\*/ 这种类型的注释) |
| --annotations    | 保留 (/\*\*/) 注释                  |
| --source-map     | 生成源码映射                        |
| --toplevel       | 最外层变量是否混淆                  |

常用指令
```shell
uglifyjs file -m -c --toplevel --mangle-props -o outputFile
```

## 关于 sourcemap

简单说，Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

这里有一个问题, 如果使用babel转换在uglifyjs压缩, 并使用uglify的source-map功能, 最终这个source-map并不能真正指向源码

解决方案有两个:
1. 使用webpack, webpack通过抽离文件, 并配合 并通过某些插件来将中间生成的 source-map 合并
2. 手动使用 `source-map-merger` 之类的库合并中间过程的source-map
