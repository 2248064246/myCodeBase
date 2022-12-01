# privoxy 实现类似 pac 功能

> 主要目的时实现外网 ip 走代理, 国内不走

[gfwlist2privoxy](https://github.com/snachx/gfwlist2privoxy) 这个工具用于将 `gfwlist` 文件转为 privoxy 的 action 文件

```shell
pip install gfwlist2privoxy


gfwlist2privoxy -f /etc/privoxy/gfw.action -p "127.0.0.1:1080" -t socks5

# 更多命令执行 -h


vi /etc/privoxy/config

# 写入
actionsfile /etc/privoxy/gfw.action

# 注意: 如果之前写入过 forward-socks5 或 forward 都需要注释掉

# 重启privoxy
systemctl restart privoxy
```
