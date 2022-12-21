# hysteria

功能: `http socks5代理` `tcp/udp流量转发`

比 `ssr + kcptun` 方式速度块很多 (几乎可以没有太多损耗的完全吃满本地带宽) (ssr + kcptun 有两层加密, 会导致数据加大很多, 实际结果就是最终带宽变小, 而 hysteria 的带宽损耗很小)

> 如果害怕 hysteria 不稳定, 可以 hysteria + kcptun 一起用

> 实际上 hysteria 使用的是 tcp, 要比 kcptun 更加稳定就是

> 但是在手机上表现不如 `ssr + kcptrun`, 就很奇怪

[项目地址](https://github.com/apernet/hysteria)

[文档地址](https://hysteria.network/zh/docs/advanced-usage/)

## 快速开始

```shell
# 下载软件
wget https://github.com/apernet/hysteria/releases/download/v1.3.0/hysteria-linux-amd64
```

## 获取一个 TLS 证书

一个免费的 TLS 证书颁发机构
[Let's Encrypt](https://letsencrypt.org/zh-cn/getting-started/)

Certbot ACME 客户端, 快速获取 TLS 证书
[https://certbot.eff.org/](https://certbot.eff.org/)

```shell
# 安装
apt install certbot

# 创建账户
certbot register -m 你的邮箱

# 如果需要改变邮箱执行 certbot update_account

# 生成证书
certbot certonly

# 前提需要一个与当前机器匹配的域名
# How would you like to authenticate with the ACME CA? 此选项选 1:
# 注意需要保证80端口没有被占用
# 会提示输入域名
# 成功后会显示生成的证书位置
```

## 服务端

创建 `config.json` 配置文件

- 使用在线的证书

```json
{
  "listen": "0.0.0.0:40000",
  /* === 使用内置的 ACME 客户端从 Let’s Encrypt 自动获取自己域名的证书。===*/
  "acme": {
    "domains": ["域名"],
    "email": "生成证书时绑定的邮箱"
  },
  /* ===================================== */
  // 可选的 obfs 选项使用提供的密码对协议进行混淆，这样协议会被识别为未知 UDP 流量而不是 Hysteria/QUIC，可以用来绕过针对性的 DPI 屏蔽或者 QoS。
  "obfs": "xxxx"
}
```

- 使用本地的 TLS 证书文件

```json
{
  "listen": "0.0.0.0:40000",
  /* === 也可以手动输入证书地址 === */
  "cert": "crt 文件地址",
  "key": "key 文件地址",
  /* =========================== */
  "obfs": "HYL123lh"
}
```

- 启动

```shell
# 需要对 hysteria-linux-amd64 授予可执行权限
./hysteria-linux-amd64 -c config.json server
```

## 客户端

同样需要创建一个`config.json` 文件

```json
{
  // 服务端地址
  "server": "example.com:36712",
  "obfs": "8ZuA2Zpqhuk8yakXvMjDqEXBwY",
  // 上传和下载限速 (单位 Mbps)
  // (尽可能准确填写当前的网络带宽, 不准确的数值会严重影响 Hysteria 的性能（过高、过低都是）。)
  "up_mbps": 40,
  "down_mbps": 90,

  "socks5": {
    "listen": "127.0.0.1:1080"
  },
  "http": {
    "listen": "127.0.0.1:8080"
  }
}
```

启动

```shell
./hysteria-linux-amd64 -c config.json
```

## 增加验证

> `obfs` 有验证功能, 这个可以选择性加上

**服务端**

```json
{
  "auth": {
    // 验证
    "mode": "passwords", // 验证模式，目前支持 "none", "passwords"
    "config": ["xxx"]
  }
}
```

**客户端**

```json
{
  "auth": "[BASE64]", // Base64 验证密钥
  "auth_str": "xxx" // 字符串验证密钥，和上面的选项二选一
}
```

## privoxy 设置

`hysteria` 提供的是 `socks5` 和 `http` 两个代理. 通过 `privoxy` 代理只暴露一个端口.

```ini
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
keep-alive-timeout 20000
tolerate-pipelining 1
socket-timeout 300
# 这两个需要对应 hysteria 的 socks5 代理地址和 http 代理地址
forward-socks5 / 127.0.0.1:1080 .
forward / 127.0.0.1:1081
```

## pc 端客户端

[nekoray](https://github.com/MatsuriDayo/nekoray) 一个支持所有协议的客户端

配置 `hysteria` 是需要注意:

1. 需要下载 hysteria 的 windows 版本核心 [hysteria 核心](https://github.com/apernet/hysteria)
2. 在编辑页面, `地址`和`端口`需要写 hysteria 的服务地址和端口
3. 写入如下格式 json 配置
   ```json
   {
     "server": "ip:port",
     "obfs": "obfs",
     "up_mbps": 50,
     "down_mbps": 100,
     "socks5": {
       // 切记这里使用 %socks_port%, 不要改
       "listen": "127.0.0.1:%socks_port%"
     },
     "http": {
       "listen": "127.0.0.1:10800"
     }
   }
   ```
4. 点击 `首选项` -> `路由设置` -> 点击`左下角的预设`按钮 -> 根据情况选择
5. 启动服务

## 移动端客户端

[SagerNet](https://sagernet.org/) 一个几乎支持所有流行代理的工具 (包括 ssr/ss v2ray Trojan 等)

需要同时下载对应的 `Hysteria` 插件

> 有一个问题, 使用`sagerNet` 配置 `ss + kcptun` 连不上...
