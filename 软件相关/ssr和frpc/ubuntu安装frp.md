# ubuntu 安装 frp

> 目的是进行内网穿透

> 注意, python3.10 目前不支持

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
# 通过 test.luoshuifushen.cn:7012 就能访问到
subdomain = test

[ttyd]
type = http
local_ip = 0.0.0.0
local_port = 9020
use_encryption = true
# 通过 ssr.luoshuifushen.cn:7012 就能访问到
subdomain = ssr
```

## 关于 xtcp

> 这是一个 点对点 的传输, 用于大浏览的并且不通过服务端的数据传输(典型的是 rdp)

> 需要注意的是这个模式的连通并不是100%

需要在 A, B 两个客户端都安装 `fprc`

现在假设 B 需要通过 xtcp 直接连接 A

A 的`frpc.ini` 配置

```ini
[common]
server_addr = xxxx      #服务器地址
server_port = 7010      #frpc端口 (bind_port 那个)
token = HYL123lh        #秘钥
tls_enable = true       #是否使用tls加密

[p2p_ssh]
type = xtcp             #协议使用 xtcp
sk = ggbone             #相当于秘钥, 两个客户端需要相同
local_ip = 127.0.0.1
local_port = 22
```

B 的`frpc.ini` 配置
```ini
[common]
server_addr = xxxx      #服务器地址
server_port = 7010      #frpc端口 (bind_port 那个)
token = HYL123lh        #秘钥
tls_enable = true       #是否使用tls加密

[p2p_ssh_visitor]
type = xtcp             #协议使用 xtcp
sk = ggbone             #相当于秘钥, 两个客户端需要相同
role = visitor      
server_name = p2p_ssh  
bind_addr = 127.0.0.1   #这是本地服务ip
bind_port = 6000        #这是本地服务端口
```

通过如下使B 连通A
```shell
ssh root@127.0.0.1 -p 6000
```


## 手机使用 frpc 

[软件地址](https://github.com/qiuhaotc/frp_android/releases/tag/v1.0)

配置和电脑端的一致就OK


## 某些情况下可能导致 xtcp 无法打通

路由器尽量开启 DMZ(指向路由器的请求会被转发到设置的ip) (这个在p2p直连中比较重要)

NAT 模式???


> 这个和 WebRTC 比起来还是不太行, WebRTC基本上可以做到任何 NAT 网络的穿透

> 这个 xtcp 在多个子路由的情况下, 需要开启路由器的 DMZ 设置, 不然穿不透...