# 增加其他语言内核

jupyter 默认只支持 python3

[jupyter 内核支持](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels)

## 支持 JS/TS

### 使用 tslab

[仓库地址](https://github.com/yunabe/tslab)

这是一个支持最新 ES/TS 的包

```
npm i -g tslab

验证安装是否正确
tslab install --version

安装内核
tslab install

查看内核列表, 检测时候安装正确
jupyter kernelspec list
```

### 使用 ijavascript 包

[仓库地址](https://github.com/n-riesco/ijavascript)

```shell
npm i -g ijavascript

ijsinstall

查看内核列表, 检测时候安装正确
jupyter kernelspec list
```

> 这个包在 linux 下使用 npm 安装可能会报错, 使用 cnpm 则不会...

## 补充

### linux 下安装 nodejs, npm

ubuntu | deepin 直接使用 `apt-get`

```shell
sudo apt install nodejs npm
```

不过这种方式安装的不会是最新版的 nodejs

1. 去 nodejs 官网下载 linux 二进制文件(x64) 版本(是 .xz 压缩文件)
2. 使用 xz 命令解压下载的包
   ```shell
   xz -dv node-v16.15.1-linux-x64.tar.xz
   ```
3. 解压后得到一个 tar 包 (node-v16.15.1-linux-x64.tar)
4. 使用 tar 解压缩

   ```shell
    tar -xfv node-v16.15.1-linux-x64.tar
   ```

5. 解压后将文件移入 `/usr/local/` 下

   ```shell
   mv node-v16.15.1-linux-x64 /usr/local/nodejs
   ```

6. 建立软连接, 方便全局调用

   ```shell
    ln -s /usr/local/nodejs/local/npm /user/local/bin
    ln -s /usr/local/nodejs/local/node /user/local/bin
    ln -s /usr/local/nodejs/local/npx /user/local/bin
   ```
