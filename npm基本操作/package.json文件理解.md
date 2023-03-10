## 字段说明

### name

如果需要将此库打包发布, 则`name`和`version`是必须的. 这两个会组成唯一值来标识这个包.

如果不需要发布, 则`name`和`version`是可选的.

`name`属性值的一些规则:

- 必须少于 214 个字符,
- 新发布的包不允许使用包含大写字符
- 这个名称最终会成为 url, 命令行和文件夹名称的一部分, 因此不能包含任何非 URL 安全字符(non-URL-safe characters)
- `.`和`_`不能出现在开头

> 可以用 `@xxx/xx` 来说明包的作用域, 例如 `@babel/core`. 这只是一个名称规范, 对包进行命名上的分类.

### version

`version` 规则 `X.Y.Z-beta.1`

- 第一位代表主版本. 通常涉及重大功能更新, 产生了破坏性变更时会更新此版本
- 第二位代表次版本, 通常是引入了新功能, 能够向下兼容.
- 第三位代表修订号, 通过是修复了一些问题, 能够向下兼容
- 第四位是希腊版本号, 用来说明此包处于的阶段. 后面的数字表示次版本
  - base 表示只有整体架构, 功能不完善
  - alpha 表示是测试版本
  - beta 表示是测试后的把版本 (一般这个见得多)
  - rc 表示此版本已经成熟
  - release 表示最终版本

`version` 必须能够被 `semver` 解析

**依赖中 version 的解析规则**

- `version` 必须是当前版本
- `>version` 必须大于这个版本
- `>=version`
- `<version`
- `<=version`
- `~version` 允许匹配所有的`修订号`
- `^version` 允许匹配所有`次版本`
- `1.2.x` 同 `~version`
- `http://...` url 作为依赖
- `*` 匹配任何版本
- `version1-version2` 类似 `>=version1 <=version2`
- `version1 || version2` 满足其中一个
- `git://xxx` Git URL 作为依赖项
- `file:/xxx/` 本地文件作为依赖

### description

包描述

### keywords

包的关键字. 这是一个`字符数组`, 能够帮助发现包.

### homepage

指向当前项目的主页的 url 地址

### bugs

指定一个`url`或者`emial`来提交 bug

```json
{
  "url": "https://github.com/owner/project/issues",
  "email": "project@hostname.com"
}
```

### license

必须明确指出一个许可证, 让所有人知道被允许如何使用这个包, 以及你施加在这个包上的限制.

开源协议:

- `GPL协议`
- `BAD协议`
- `MIT协议` 一般 github 上的库都使用这个协议
- `Apacha协议`

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9FNVlKRVB1RlZuaWJqc2hrQUdCNlgxYkFOdXNDZWVtekdwUk1IQTdITDdrcDBFZVliVDBQQ3dxSFRFb21BMk9WamJVZWdINEZIUjJBWDRpYVFrV2cxVldRLzY0MA?x-oss-process=image/format,png)

```json
{ "license": "MIT" }
```

### autor, contributor

用于配置开发者的信息

```json
{
  "name": "Barney Rubble",
  "email": "b@rubble.com",
  "url": "http://barnyrubble.tumblr.com/"
}
```

### files

一个字符串数组, 用来描述当前包的入口文件.

### main

一个字符串, 用来描述当前包的最重要入口.

当通过`import`对其进行引入的时候, 会读取这里的入口.

### bin

一个对象, 指定当前包的可执行文件位置.

全局安装的时候, 会链接到`/bin`

本地安装时会链接到`./node_modules/.bin`

```json
{ "bin": { "myapp": "./cli.js" } }
```

如果只有可执行文件, `bin`字段也可是一个字符串, 此时可执行文件名称和项目`name`相同

```json
{ "name": "my-program", "version": "1.2.5", "bin": "./path/to/program" }
```

### man

指定`man`指定的文档位置

```json
{
  "man": "./man/doc.1"
}
```

### repository

设置当前包的仓库定制

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/npm/cli.git"
  }
}
```

### scripts

设置当前库在不同周期的需要运行的指令

```json
{
  "scripts": {
    "dev": "xxx"
  }
}
```

### dependencies
