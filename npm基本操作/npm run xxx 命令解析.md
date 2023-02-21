# npm run xxx 发生了啥

首先, npm 会先去`package.json` 文件中的 `scripts` 中查找对应指令.

如果找不到, 则会报命令不存在错误, 例如: `npm ERR! Missing script: "xxx"`

如果存在, 则会执行`scritps`中对应的命令.

例如有如下指令:

```json
{
  "scripts": {
    "mime:txt": "mime a.txt"
  }
}
```

执行`npm run mime:txt` 命令, 输出:

```
> my-code-base@1.0.0 mime:txt
> mime a.txt

text/plain
```

第一行`my-code-base` 是`package.json`中的`name`属性值, 也就是项目名称. `1.0.0` 是项目版本.

`mime a.txt` 是指令具体执行的命令. 此时就和在`cmd`中执行一模一样.

> 会有一个问题?? -> 如果没有全局安装`mime`怎么办?

答: 即使没有全局安装`mime`指令, 只要单前目录`node_modules`中有这个包就能运行.

npm 会查找`node_modules`中的`.bin`目录, 是否有`mime`这个程序, 有的会执行. (windows下是 mime.cmd 程序, linux下是 mime (bash)文件) 

## 关于 `.bin` 目录下的文件的生成

以`mime`为例, 该项目的`package.json` 文件中包含了一个`bin`字段:

```json
{
  "bin": {
    "mime": "cli.js"
  }
}
```

npm 在下载这个包时, 会根据这个配置来生成对应的可执行文件存放到`.bin`文件中