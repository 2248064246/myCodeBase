
# 远程Deepin

使用 xrdp 

`sudo apt-get install xrdp` 安装xrdp服务

`sudo system enable xrdp` 设置为开机启动

`sudo service xrdp restart` 启动 xrdp 服务


这边有一个点需要特别注意， deepin 中已经登录的账户无法再通过 windows远程登录（会黑屏）

需要注销账户或者新建一个用户， 然后远程那个新建的用户

> 更为详细的教程查看 https://bbs.deepin.org/zh/post/209321