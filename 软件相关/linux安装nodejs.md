
### linux 下安装 nodejs, npm

ubuntu | deepin 直接使用 `apt-get`

```shell
sudo apt install nodejs npm
```

不过这种方式安装的不会是最新版的 nodejs

1. 去 nodejs 官网下载 linux 二进制文件(x64) 版本(是 .xz 压缩文件)
2. 使用 xz 命令解压下载的包
```shell
   xz -dq node-v16.15.1-linux-x64.tar.xz
```
3. 解压后得到一个 tar 包 (node-v16.15.1-linux-x64.tar)
4. 使用 tar 解压缩

```shell
    tar -xf node-v16.15.1-linux-x64.tar
```

5. 解压后将文件移入 `/usr/local/` 下

```shell
   mv node-v16.15.1-linux-x64 /usr/local/nodejs
```

6. 建立软连接, 方便全局调用 (这里直接软链过去会有问题, npm全局安装的包会无法使用)

> 这里一定要用绝对路径, 不然会报 "符号链接的层数过多" 
```shell
    ln -s /usr/local/nodejs/bin/npm /usr/local/bin
    ln -s /usr/local/nodejs/bin/node /usr/local/bin
    ln -s /usr/local/nodejs/bin/npx /usr/local/bin
```

7. 推荐通过增加环境变量来调用

```shell
vi /etc/profile

# 写入
export PATH=$PATH:/usr/local/nodejs/bin

# 执行
source /etc/profile
```