# 提速 ssr

## 优化 kcptun 配置

> 前提: 家用带宽 100mpbs, vps: 1 核 0.5G 1Gbps

> 测速: fast.com

使用默默人的 kcpturn 配置, 速度只能达到 `11mbps`

推荐如下配置:

```json
{
  "localaddr": ":55555",
  "remoteaddr": "x.x.x.x:xxx",
  "key": "xxxx",
  "crypt": "aes",
  "mode": "fast3",
  "mtu": 1000,
  "sndwnd": 2048,
  "rcvwnd": 2048,
  "datashard": 10,
  "parityshard": 3,
  "dscp": 46,
  "nocomp": false,
  "quiet": false,
  "tcp": false
}
```

现在`fast.com`能够跑到`40Mbps`, 本地带宽也基本跑满了

这里 `crypt`设置为`none`只会增加`4Mbps`的速度, 为了安全考虑还是设置为`aes`

**手动启动/停止 kcptun**

```shell
# 安装位置
cd /usr/local/kcptun

# 手动停止
supervisorctl stop kcptun

# 手动启动
supervisorctl stop kcptun
```

## 使用 `udp2raw` 防止被 `Qos`

UDP 流量伪装工具，可以将 udp 流量伪装为 TCP 流量

实现原理是模拟 TCP 3 次握手，让防火墙将 UDP 流量误认为是 TCP 流量，从而避开部分运营商对 UDP 流量的 QOS 限速和干扰，有效提高网络连接的速度和稳定性。

udp2raw 在用于 KCPTUN 等科学上网辅助工具时，则可以在保证 KCPTUN 加速效果的基础上，进一步增强连接的稳定性，避免由 UDP 限速导致的频繁掉速和断线。

**Kcptun 被 Qos 限速表现**

1. 加速效果不稳定，速度时快时慢
2. 每隔一段时间，KCPTUN 会掉线无法连接，无法正常科学上网。
3. 掉线持续几分钟后，恢复正常连接

**udp2raw 的使用对象**

- Kcptun
- Vray
- WireGuard

[项目地址](https://github.com/wangyu-/udp2raw)

使用方法

**服务端**

```shell
# -l: 表示暴露给外部的tcp地址
# -r: 表示需要转换的udp服务和端口(也就是服务端kcptun的地址)
./udp2raw_amd64 -s -l0.0.0.0:4096 -r 127.0.0.1:7777    -k "passwd" --raw-mode faketcp -a
```

**客户端**

```shell
# -l: 表示提供给外部调用的地址(客户端kcptun使用这个地址作为远程地址)
# -r: 表示服务端的tcp地址
./udp2raw_amd64 -c -l0.0.0.0:3333  -r44.55.66.77:4096  -k "passwd" --raw-mode faketcp -a
```

`udp2raw` 自身会对流量进行再加密, 其实这是没必要, 除非封锁很严格或者要访问内容特别重要敏感.

```shell
# 将这两项设为none
--cipher-mode none --auth-mode none
```

`udp2raw` 应该是对单核 vps 不友好, 速度只有优化后的 kcptun 的三分之一. 本地宽带完全没有跑满...

...可以作为 kcptun 不稳定时期的处理方案
