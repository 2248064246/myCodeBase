# ttyd 安装


1. 需要先下载 cmake 及对应库

```shell
sudo apt-get install build-essential cmake git libjson-c-dev libwebsockets-dev
```

2. 安装 ttyd
```shell
git clone https://github.com/tsl0922/ttyd.git
cd ttyd && mkdir build && cd build
cmake ..
make && sudo make install
```

> 上面这一步可能出现编译报错

```
CMake Error at CMakeLists.txt:65 (message):
  libwebsockets was not build with libuv support (-DLWS_WITH_LIBUV=ON)
```

解决方案是打开build文件下的 `CmakeCache.txt` 文件, 修改 `LWS_WITH_LIBUV=ON` 为 `ON`. 然后重新编译.

> ==网上有教程需要重新安装 `libwebsockets-dev` 其实不用哈 [网络上的教程](https://www.cnblogs.com/melodicule/p/16071591.html)==

> ==这里直接修改会出问题(运行的时候会出故障)==

还要进行如下操作
```shell
sudo apt-get remove libwebsockets-dev
git clone https://github.com/warmcat/libwebsockets.git
cd libwebsockets
mkdir build && cd build
cmake .. -DLWS_WITH_LIBUV=ON
make && sudo make install
```

## typd 命令

```
    -p, --port              端口监听 (默认: 7681, 使用 `0` 即随机生成端口)
    -i, --interface         网络接口绑定（例如：eth0），或 UNIX 指定socket路径（例如：/var/run/ttyd.sock）
    -c, --credential        基本身份验证凭证 (格式: 用户名:密码)
    -u, --uid               用User id运行
    -g, --gid               用Group id运行
    -s, --signal            退出时发送给命令的信号 (默认: 1, SIGHUP)
    -a, --url-arg           Allow client to send command line arguments in URL (eg: http://localhost:7681?arg=foo&arg=bar)
    -R, --readonly          Do not allow clients to write to the TTY
    -t, --client-option     Send option to client (format: key=value), repeat to add more options
    -T, --terminal-type     Terminal type to report, default: xterm-256color
    -O, --check-origin      Do not allow websocket connection from different origin
    -m, --max-clients       Maximum clients to support (default: 0, no limit)
    -o, --once              Accept only one client and exit on disconnection
    -B, --browser           Open terminal with the default system browser
    -I, --index             Custom index.html path
    -b, --base-path         Expected base path for requests coming from a reverse proxy (eg: /mounted/here, max length: 128)
    -P, --ping-interval     Websocket ping 间隔(秒) (默认: 300)
    -6, --ipv6              IPv6支持开关
    -S, --ssl               SSL支持开关
    -C, --ssl-cert          SSL 证书文件地址
    -K, --ssl-key           SSL key 文件地址
    -A, --ssl-ca            客户端证书验证SSL CA文件地址
    -d, --debug             设置日志级别 (默认级别: 7)
    -v, --version           查看版本编号
    -h, --help              帮助
```


一个简单配置

```shell
ttyd -p 8085 -c ggbone:xxx  bash 
```

