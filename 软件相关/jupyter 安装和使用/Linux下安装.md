# linux 下安装jupyter

## 安装 python3 和 pip3

ubuntu 或 deepin 系统中, 自带 python2

```
sudo apt-get install python3
```

一句话搞定


检查是否安装正确

```
python3 --version

pip3 --version
```

> 如果没有默认自带 pip3, 需要手动安装

```
sudo apt-get install python3-pip

sudo pip3 install --upgrade pip
```


## 安装 jupyter

这一步和window下一致


## 其余步骤也和 windows 下安装一致

可能出现 `error: command ‘x86_64-linux-gnu-gcc‘ failed with exit status 1` 错误, 此时执行如下命名进行安装

```shell
sudo apt-get install build-essential python3-dev libssl-dev libffi-dev libxml2 libxml2-dev libxslt1-dev zlib1g-dev
```
