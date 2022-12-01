# ssr 服务端搭建

一键安装脚本

```shell
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

使用 kcptun 转发(更加安全, 不易被封, 但是数据包会变大, 导致实际速度下降)

kcptun 一键安装脚本

```shell
wget --no-check-certificate -O kcptun.sh https://github.com/kuoruan/shell-scripts/raw/master/kcptun/kcptun.sh && bash kcptun.sh
```

[详细博客教程](https://visoon0012.github.io/2017/Shadowsocks/Ubuntu%E4%BD%BF%E7%94%A8KCPTUN%E4%B8%BASS%E5%8A%A0%E9%80%9F/)

这里注意 `加速地址` 和 `加速端口` 是当前服务器 ssr 的地址和端口

## windows 下使用 ssr 客户端和 kcptun 客户端

windows 下载地址

[ShadowsocksR-Windows](https://github.com/HMBSbige/ShadowsocksR-Windows) (**建议使用这个**)

[shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows)

以上两个任选一个就可以

kcptun 下载
[kcptun 客户端服务下载地址](https://github.com/xtaci/kcptun)

上面这个只是命令行工具, 下载对应版本后解压.

下载 kcptun GUI 工具
[kcptun_gclient](https://github.com/dfdragon/kcptun_gclient)

解压缩, 并将结果和 kcptun 客户端放在一个目录下

打开 kcptun GUI 软件, 配置 `kcptun 客户端exe文件`(选择 kcptun 客户端文件)

创建一个 `kcptun_config.json`文件, 里面写入服务端 kcptun 生成的配置文件, 然后启动.

然后启动 ssr 客户端, 这里服务地址和端口填写本地 kcptun 的地址和端口. 其他写入服务端 ssr 生成的配置.

## android 使用 ss 和 kcptun

在安卓端只能使用 ss 才能配合 kcptun.

[shadowsocks-android](https://github.com/shadowsocks/shadowsocks-android)

[kcptun-android](https://github.com/shadowsocks/kcptun-android/releases)

这里要注意 ss 中服务器需要写真实服务器地址, 端口需要写服务器的 kcptun 的端口(默认 29900), 其余不变;

在插件那里选择 kcptun, 配置复制服务端 kcptun 生成的手机端配置

## linux 使用 ssr 和 kcptun

下载 `ssr` 客户端

```shell
wget http://www.djangoz.com/ssr

sudo mv ssr /usr/local/bin

sudo chmod 766 /usr/local/bin/ssr

ssr install
```

> 如果下载链接失效, 可以查看这个文件 https://github.com/the0demiurge/CharlesScripts/blob/master/charles/bin/ssr

下载 `kcptun` 客户端

`https://github.com/xtaci/kcptun`

```shell
# 运行
/usr/local/kcptun/client_linux_amd64 -l ":55555" -r "x.x.x.x:xxx" --key "xxxx" --crypt "none" --mode "fast3" --mtu 1000 --sndwnd 2048 --rcvwnd 2048 --ds 10 --ps 3 --dscp 46
```


通过`privoxy`统一代理桌面的所有http/socks 流量
```shell
# 安装
sudo apt install privox
# 配置
sudo vim /etc/privoxy/config
```

如下配置 `/etc/privoxy/config`
```json
user-manual /usr/share/doc/privoxy/user-manual
confdir /etc/privoxy
logdir /var/log/privoxy
filterfile default.filter
logfile logfile
listen-address  127.0.0.1:8118
toggle  1
enable-remote-toggle  0
enable-remote-http-toggle  0
enable-edit-actions 0
enforce-blocks 0
buffer-limit 4096
enable-proxy-authentication-forwarding 0
forwarded-connect-retries  0
accept-intercepted-requests 0
allow-cgi-request-crunching 0
split-large-forms 0
keep-alive-timeout 5
tolerate-pipelining 1
socket-timeout 300
forward-socks5 / 127.0.0.1:1080 .
```

在 `~/.bashrc` 中写入请求代理
```shell
export http_proxy="http://127.0.0.1:8118"
export https_proxy="http://127.0.0.1:8118"
export no_proxy="127.0.0.1,localhost,192.168.124.*"
```

重新设置文件
```shell
# 如果不生效, 重新登陆下终端
source ~/.bashrc
```

