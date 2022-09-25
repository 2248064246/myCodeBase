# ssr 服务端搭建

一键安装脚本

```shell
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

使用 kcptun 转发(更加安全, 不易被封, 但是数据包会变大, 导致实际速度下降)

kcptun一键安装脚本
```shell
wget --no-check-certificate -O kcptun.sh https://github.com/kuoruan/shell-scripts/raw/master/kcptun/kcptun.sh && bash kcptun.sh
```
[详细博客教程](https://visoon0012.github.io/2017/Shadowsocks/Ubuntu%E4%BD%BF%E7%94%A8KCPTUN%E4%B8%BASS%E5%8A%A0%E9%80%9F/)

这里注意 `加速地址` 和 `加速端口` 是当前服务器 ssr 的地址和端口



## windows 下使用 ssr客户端和 kcptun 客户端

windows下载地址

[ShadowsocksR-Windows](https://github.com/HMBSbige/ShadowsocksR-Windows) (**建议使用这个**)

[shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows)

以上两个任选一个就可以


kcptun下载
[kcptun客户端服务下载地址](https://github.com/xtaci/kcptun)

上面这个只是命令行工具, 下载对应版本后解压.

下载kcptun GUI 工具
[kcptun_gclient](https://github.com/dfdragon/kcptun_gclient)

解压缩, 并将结果和kcptun客户端放在一个目录下

打开kcptun GUI 软件, 配置 `kcptun 客户端exe文件`(选择kcptun客户端文件)

创建一个 `kcptun_config.json`文件, 里面写入服务端kcptun生成的配置文件, 然后启动.


然后启动 ssr 客户端, 这里服务地址和端口填写本地kcptun的地址和端口. 其他写入服务端ssr生成的配置.

## android 使用 ss 和 kcptun

在安卓端只能使用 ss 才能配合kcptun.

[shadowsocks-android](https://github.com/shadowsocks/shadowsocks-android)

[kcptun-android](https://github.com/shadowsocks/kcptun-android/releases)

这里要注意 ss 中服务器需要写真实服务器地址, 端口需要写服务器的kcptun的端口(默认29900), 其余不变;

在插件那里选择kcptun, 配置复制服务端kcptun生成的手机端配置

