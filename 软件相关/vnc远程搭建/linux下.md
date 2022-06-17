# linux 安装 vnc


## 先安装 vncserver

```
sudo apt-get install tightvncserver
```

```
# 启动
vncserver :1 -geometry 1902x1080

# 停止
vncserver -kill :1
```

## 安装 noVNC

先安装 websockify

```
# 需要的依赖
pip3 install numpy

# 然后克隆仓库
git clone https://github.com/novnc/websockify.git

# 进入目录下
python3 setup.py install

# 退出目录, 克隆 noVNC 库
git clone https://github.com/novnc/noVNC.git

# 启动
cd ./noVNC

./utils/novnc_proxy --vnc localhost:5901
```



> 注意启动 vnc 服务的时候是用哪个账户登录的, 那个 noVNC 中就是哪个账户



## 停止服务

通过查找 novnc 的进程, 然后杀掉


## 补充

在 linux 下的 vnc 更好用, 在window下, rdp 更好用