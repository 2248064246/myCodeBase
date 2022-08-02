# 安装最新 python

先执行

```shell
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev
```

下载源码包

```shell
# 这里使用的华为开源地址
wget https://repo.huaweicloud.com/python/3.10.0/Python-3.10.0.tgz
```

解压缩

```shell
gizp -d Python-3.10.0.tgz

tar -xvf Python-3.10.0.tar
```

进入目录

```shell
cd Python-3.10.0
./configure --enable-optimizations
make & make install
```

检查 python3 版本

```shell
python3 --version
```

## pip 换源解决下载过慢问题

```shell
# 在更目录创建 .pip 文件夹
mkdir ~/.pip

# 创建配制文件
vim ~/.pip/pip.conf
```

写入如下内容

```bash
  [global]
  index-url = http://mirrors.aliyun.com/pypi/simple
  [install]
  trusted-host=mirrors.aliyun.com

```
