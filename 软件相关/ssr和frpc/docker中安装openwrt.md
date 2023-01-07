# 双网口主机通过 docker 安装 openwrt 实现软路由功能

在 docker 中安装 openwrt,而不是在 openwrt 中安装 docker, **真正做到`ALL IN ONE`**

**特点**

- 不用重新购买设备(只需要再买个 usb 网卡或者 minipcie 网卡等等都行)
- 性能及其强大(相比较于绝大部分软路由, 自用的 linux 服务器都不会太差)
- 不会对原 linux 系统上的服务有任何影响

## 前提和环境

- 一台性能还不错的 Linux 主机(宿主机)
- 双网口
- docker

## 原理

通过`macvlan`技术在现有网卡的基础上创建虚拟网卡, 并将虚拟网卡挂载到 docker 容器中 openwrt 上.

> 最好百度看看 `macvlan` 的介绍, 理解其作用和功能

## 一些不必要的条件

docker 可以安装 `portainer` 来在页面上管理容器, 方便像我这种新手操作和管理容器

[推荐一个中文版 portainer 镜像](https://github.com/outlovecn/portainer-cn)

![image.png](https://s2.loli.net/2022/12/17/v1DCZwe5j8XVJB9.png)

## 查看自身网卡名称

```shell
ip addr
```

```
2: enp6s0: <BROADCAST,MULTICAST,PROMISC,UP,LOWER_UP> mtu 1500 qdisc fq state UP group default qlen 1000
    link/ether 00:16:96:e9:1a:01 brd ff:ff:ff:ff:ff:ff
    inet 192.168.124.13/24 brd 192.168.124.255 scope global dynamic noprefixroute enp6s0
       valid_lft 72610sec preferred_lft 72610sec
    inet6 fe80::455c:bd08:4a7d:ce26/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
3: enp8s0: <BROADCAST,MULTICAST,PROMISC,UP,LOWER_UP> mtu 1500 qdisc fq state UP group default qlen 1000

```

> 当前 enp6s0 和上层路由器相连接, enp8s0 没有任何连接

> enp8s0 将用于 openwrt 的 `lan` 口, enp6s0 将用于 `wan` 口

## 开启网卡的混杂模式

```shell
ip link set enp8s0 promisc on
ip link set enp6s0 promisc on
```

上面这一步似乎在重启之后就会失效, 需要持久化一下, 具体操作百度....

开启 ipv4 转发

```shell
vi /etc/sysctl.conf

# 取消 net.ipv4.ip_forward = 1 的注释
# 或者添加 net.ipv4.ip_forward = 1

# 重新加载配置
sysctl -p /etc/sysctl.conf
```

## 配置 Lan 口的 macvlan

创建一个名为 `maclan` 的虚拟网卡, 这里的 ip 可以随意定

```shell
docker network create -d macvlan --subnet=192.168.10.0/24 --gateway=192.168.10.1 -o parent=enp8s0 maclan
```

查看网络

```shell
docker network ls

# 需要有这样一条数据
384a7789733c   maclan    macvlan   local
```

## 拉取 docker 镜像

这里会先将`maclan` 挂载到容器上, 用于openwrt的`lan`口

```shell
docker run --restart always --name openwrt -d --network maclan --privileged --ip 192.168.10.2  nonnichen/nonniwrt /sbin/init
```

查看镜像

```shell
docker ps
```

`nonnichen/nonniwrt` 这个是一个比较老的镜像了, 需要最新镜像可以自行拉取[lede 的源码](https://github.com/coolsnowwolf/lede)进行打包.

**镜像资料**

- [本人自己编译的 64 位 openwrt docker 镜像](https://pan.baidu.com/s/13R7DqFfkzyVA5HaszZ6qhA?pwd=6686), 提取码：6686 (编译时间 2022/12/17)
- [一个热心分享的站点制作的镜像](https://op.supes.top/firmware/x86_64/)

**docker 如何使用本地镜像**

```shell
# 导入本地镜像
cat xxx.tar.gz | docker import - openwrt/lede

# 使用
docker run --restart always --name openwrt -d --network maclan --privileged --ip 192.168.10.2  openwrt/lede /sbin/init
```

## 修改 docker lan 口配置

```shell
# 进入容器
docker exec -it openwrt /bin/sh

#
vi /etc/config/network

```

主要修改 `lan` 配置, 改成下面这个样子 (lan 口 ip 要和指定给 openwrt 的 ip 相同, 也就是 192.168.10.2)

```
config interface 'loopback'
        option ifname 'lo'
        option proto 'static'
        option ipaddr '127.0.0.1'
        option netmask '255.0.0.0'

config globals 'globals'
        option ula_prefix 'fd2f:edb0:1371::/48'
        option packet_steering '1'

config interface 'lan'
        option type 'bridge'
        option ifname 'eth0'
        option proto 'static'
        option ipaddr '192.168.10.2'
        option netmask '255.255.255.0'
        option ip6assign '60'
```

然后重启网络

```shell
/etc/init.d/network restart
```

检查 ip

```shell
ip addr
```

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: br-lan: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 02:42:c0:a8:0a:02 brd ff:ff:ff:ff:ff:ff
    inet 192.168.10.2/24 brd 192.168.10.255 scope global br-lan
       valid_lft forever preferred_lft forever
67: eth0@if3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-lan state UP group default
    link/ether 02:42:c0:a8:0a:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
```

> 这里不同版本的 openwrt 可能会有区别(我用的是自己构建的版本), 只要`bar-lan`或者`eth0` 的地址是 `192.168.10.2` 就 ok

顺便可以把 `root` 密码重置下, 不同人构建的 openwrt 版本 root 密码不太一样, 重置一下方便后续进入控制台

```shell
# 进入容器
docker exec -it openwrt /bin/sh
# 重置root密码
passwd
# 输入你想设置的密码
```

## 进入 openwrt 控制台

> 注意由于 macvlan 的限制, 宿主机目前是无法连通 docker 容器中的 ip 的

需要额外一台机器(就叫它`主机B`), 接在 `enp8s0` 也就是 lan 口上, 然后给机器设置静态的 ip 地址, 例如`192.168.10.3`.

> 如果没有, 也可以通过一些方法直接在宿主机上访问控制台, 参见[宿主机和 openwrt 联通](#through)

这里有一点需要特别注意, 网关一定要设置为 `openwrt的lan口地址`, 也就是`192.168.10.2`, dns 也可以设置为这个地址.

> 一定需要手动设置 ip 地址

![image.png](https://s2.loli.net/2022/12/17/CA5KWn3QFjIMUTD.png)

然后在浏览器输入 `192.168.10.2` 进入 openwrt 控制台

![image.png](https://s2.loli.net/2022/12/17/n159tGMxR6yDzUQ.png)

## 给 openwrt 添加 wan 口

需要用`enp6s0`再创建一个 macvlan, 此时的 ip 设置需要和上层路由相同(例如我的上层路由器是 192.168.124.1)

```shell
docker network create -d macvlan --subnet=192.168.124.0/24 --gateway=192.168.124.1 -o parent=enp6s0 macwan
```

将这张网卡挂载到 openwrt

```shell
docker network connect macwan openwrt
```

然后进入 openwrt 控制台, 设置`wan`接口(此时应该能看到 `eth1`个网卡, 选择 DHCP 客户端就好, 会自动获取 ip 地址)

![image.png](https://s2.loli.net/2022/12/17/8W1aePnXTIwokDb.png)

一定要确保`eth1`网卡能够分配到上层路由的 ip

同时也可以进入容器内查看 ip, 最终结果应该是这样子的:

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: br-lan: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 02:42:c0:a8:0a:02 brd ff:ff:ff:ff:ff:ff
    inet 192.168.10.2/24 brd 192.168.10.255 scope global br-lan
       valid_lft forever preferred_lft forever
67: eth0@if3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-lan state UP group default
    link/ether 02:42:c0:a8:0a:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
68: eth1@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:c0:a8:7c:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 192.168.124.12/24 brd 192.168.124.255 scope global eth1
       valid_lft forever preferred_lft forever
    inet6 fe80::42:c0ff:fea8:7c02/64 scope link
       valid_lft forever preferred_lft forever
```

我自己编译的`openwrt`的接口状态显示不出来, 不过并不影响功能(可能版本太新了吧, 不清楚~~)

![image.png](https://s2.loli.net/2022/12/17/ZGwSrcxHn6dUJED.png)

测试`主机B`是否能够访问互联网(网上的某些版本可能会出现能 ping 通但是无法访问互联网的问题)

如果无法访问互联网, 加一条`openwrt`的防火墙`自定义规则`, 然后重启防火墙

```shell
iptables -t nat -I POSTROUTING -s 192.168.10.0/24  -j MASQUERADE
```

## 主机 B 和 宿主机联通

只需要给宿主机的`enp8s0`网卡设置一个`192.168.10.0/24`网段的 ip 就可以

以我的宿主机`debain 11`为例

![image.png](https://s2.loli.net/2022/12/17/ZAGp2IYRlohiQ87.png)

然后`主机B`就能够和宿主机联通了

## 宿主机和 openwrt 联通 {#through}

由于 `macvlan`的特性, 宿主机和容器的 ip 是隔离的, 尽管是同一个网段 ip.

```shell
# 通过`enp8s0`创建一个虚拟网卡`hMACvLAN` (同一个物理网卡的虚拟网卡可以互通)
nmcli connection add type macvlan dev enp8s0 mode bridge ifname hMACvLAN autoconnect yes save yes

# 因该会自动获取ip地址, 可以通过 ip addr 查看

# 如果没有自动获取, 使用下面这条命令手动指定
ip addr add 192.168.10.100 dev hMACvLAN

# 指定网关
ip route add 192.168.10.2 dev hMACvLAN


```

现在在宿主机上应该能够 ping 通 192.168.10.2

应该也可以直接通过宿主机的浏览器访问`192.168.10.2`了.


## 宿主机能否通过容器的openwrt进行科学上网

在打通宿主机和openwrt的网络后, 可以在openwrt中开socks代理服务, 然后宿主机设置对应代理就ok(理论上是完全可行的, 我没试过~~)

不过不建议宿主机使用openwrt的网络, 一旦dokcer出问题可能会导致整台机器无法联网.

最好是宿主机自己跑`ssr等`进行科学上网, 即便docker出问题也能保证宿主机有网.

## 享受 ALL IN ONE 吧
