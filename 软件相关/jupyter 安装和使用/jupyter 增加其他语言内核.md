# 增加其他语言内核

jupyter 默认只支持 python3

[jupyter 内核支持](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels)

## 支持 JS/TS

### 使用 tslab

[仓库地址](https://github.com/yunabe/tslab)

这是一个支持最新 ES/TS 的包

```
npm i -g tslab

# 验证安装是否正确
tslab install --version

#安装内核
tslab install

# 查看内核列表, 检测时候安装正确
jupyter kernelspec list

# 如果上面的安装导致内核报错, 使用下面方法
# 进入 tslab 目录
./bin/tslab install --binary=$(pwd)/bin/tslab --python=python3
# 如果这时候一直显示内核正在启动
# 查看 jupyter 服务的 status, 此时可能发现 /usr/bin/下找不到node
# 需要设置 node 软链接到 /usr/bin 下
ln -s /usr/local/nodejs/bin/node /usr/bin/
ln -s /usr/local/nodejs/bin/npx /usr/bin/
ln -s /usr/local/nodejs/bin/npm /usr/bin/

```

### 使用 ijavascript 包

[仓库地址](https://github.com/n-riesco/ijavascript)

```shell
npm i -g ijavascript

# 这里不这么写可能会有史诗级大坑 (内核一直报错)
ijsinstall --spec-path=full

查看内核列表, 检测时候安装正确
jupyter kernelspec list
```

> 这个包在 linux 下使用 npm 安装可能会报错, 使用 cnpm 则不会...


