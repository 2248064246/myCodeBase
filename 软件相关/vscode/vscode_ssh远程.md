# vscode ssh 远程

需要 `remote-ssh` 插件.

**功能:**

- ssh 功能
- sftp 功能
- 能够使用 vscode 编辑文件

## 有几点需要注意

1. 优化 vscode 连接后服务端 cpu 占用高的问题

   搜索`search.followSymlinks` , 将 `远程` 和`工作区`对应设置为 `false`

2. 在终端中使用命令打开指定文件

   ```shell
   # 文件会直接在vscode的编辑器中打开(这不比vim好用?)
   # 这个命令在vscode第一次连接上服务器时会自动安装
    code 文件路径
   ```

3. 权限问题

   如果当前用户没有文件的写入权限, vscode 保存修改时报错

   使用`code`命令打开管理员权限文件也会报错

   建议使用`root`账号登陆
