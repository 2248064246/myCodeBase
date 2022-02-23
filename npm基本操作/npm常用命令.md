# npm 常用命令

- `npm v 包名` 查看包的信息
- `npm docs 包名` 查看包的文档, 一般打开包的 github 地址
- `npm bugs 包名` 查看包的 issue
- `npm cache clean` 清除缓存
- `npm ci` 一种比`npm i` 更为严格安装方式, 项目必须要有`package-lock.json`
- `npm config` 用来设置 npm, 例如 npm 的代理
  ```
  npm config set <key> <value> [-g|--global]
  npm config get <key>
  npm config delete <key>
  npm config list [-l] [--json]
  npm config edit
  npm get <key>
  npm set <key> <value> [-g|--global]
  ```
- `npm doctor` 会检查 npm 是否能够连接服务, node 版本, git 是否存在等
- `npm help 命令` 会打开一个浏览器页面显示具体的命令文档, 非常友好
- `npm ls` 列出所有安装包
- `npm ping [--registry <registry>]` ping 服务器地址是否能够连通
- `npm prefix` 项目项目位置(和 pwd 不同的是, pwd 显示当前目录位置)
- `npm prune` 移除无关的包
- `npm root` 显示 npm 根目录, 和 `npm prefix` 很相似
- `npm repo <包名>` 在浏览器打开指定包名的源码仓库页面(和 `npm docs ` 非常相似)
- `npm search <包名>` 搜索指定包
- `npm search [-l] [--json] [--parseable] <searchName>` 包搜索, 非常方便
  ```
  npm search -l qr
  // 能够找出搜友 qr 相关的包(包括关键字, 包名, 描述)
  // 必须使用 npm 的 registry, 使用cpm 无效
  // 更多具体使用查看 npm help search
  ```
- `npm shrinkwrap` 锁定依赖包版本
  ```
    在最新的npm上, 会生成 npm-shrinkwrap.json 文件, 它的作用和package-lock.json 作用一样
  ```
- `npm update [包名]` 升级包
