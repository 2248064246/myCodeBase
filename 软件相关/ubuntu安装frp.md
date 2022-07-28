# ubuntu 安装 frp

> 目的是进行内网穿透

## 下载 frp 服务端包

[github 地址](https://github.com/fatedier/frp)

[下载地址](https://github.com/fatedier/frp/releases/tag/v0.44.0)

选择 amd64 的包 `frp_0.44.0_linux_amd64.tar.gz`

```shell
# 下载
wget https://github.com/fatedier/frp/releases/download/v0.44.0/frp_0.44.0_linux_amd64.tar.gz

# 解压
tar -zxvf frp_0.44.0_linux_amd64.tar.gz

cd frp_0.44.0_linux_amd64.tar.gz

# 复将程序制到bin中
sudo cp frpc /usr/bin/
sudo cp frps /usr/bin/

# 复制配置文件 - 如果不是新安装则跳过这一步，不然会把旧配置覆盖掉
sudo mkdir /etc/frp/
sudo cp frp*.ini /etc/frp/

```

## 编辑 service 文件

```service
[Unit]
Description=Frps Service
After=network.target

[Service]
User=root
ExecStart=frps
#启动命令
Restart=on-failure -c /etc/frps/frps.ini
RestartSec=60s

[Install]
WantedBy=multi-user.target
```

```shell
# 设置自启
systemctl enable frps
```

## 编辑服务端端配置, 设置验证,端口等

> 特别注意, 正式配置文件需要去掉注释区域

`frps.ini` 文件编辑
```ini
[common]
bind_addr = 0.0.0.0             #服务主机地址(0.0.0.0表示所有地址都有效)
bind_port = 7010                #服务端端口号,和客户端的server_port一致
bind_udp_port = 7001            #upd端口
kcp_bind_port = 7010            #kcp端口(可以和主端口一致,不写默认不启用)
dashboard_port = 7011           #frp管理页面端口
dashboard_user = ggbone         #frp管理页面用户名
dashboard_pwd = HYL123lh        #frp管理页面用户密码
token = HYL123lh                #服务端和客户端协商的密码, 两端需要一致
vhost_http_port = 7012          #http端口(http穿透时统一使用这个端口, 通过前置域名具体到对应的隧道)
subdomain_host = luoshuifushen.cn #用于http穿透的顶级端口
#例如frpc设置前置域名为test, 则可以通过 test.luoshuifushen.cn 来访问 http
```

```shell
# 重启服务
systemctl restart frps
```


## 编辑客户端配置

> 注意客户端也需要配置 service


`frpc.ini` 文件编辑

```ini
[common]
server_addr = xxxx      #服务器地址
server_port = 7010      #frpc端口 (bind_port 那个)
token = HYL123lh        #秘钥
tls_enable = true       #是否使用tls加密

# 自定义的隧道
[ssh]
type = tcp              #隧道类型
local_ip = 0.0.0.0      #指定要连接的ip地址
local_port = 22         #目标端口
remote_port = 22222     #穿透时使用的端口


[webmin]
type = http
local_ip = 0.0.0.0
local_port = 9030
use_encryption = true
subdomain = test

[ttyd]
type = http
local_ip = 0.0.0.0
local_port = 9020
use_encryption = true
subdomain = ssr

[common]
server_addr = x.x.x.x
server_port = 7000

[p2p_ssh_visitor]
type = xtcp
# xtcp 的访问者
role = visitor
# 要访问的 xtcp 代理的名字
server_name = p2p_ssh
sk = ggbone
# 绑定本地端口用于访问 ssh 服务
bind_addr = 127.0.0.1
bind_port = 6000
```
