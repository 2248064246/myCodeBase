# 开启 ssh 服务

```shell
# 安装服务
apt-get install openssh-server
# 开启服务
systemctl start ssh
```

## 允许使用 root 登录

```shell
# 打开配置文件
vi /etc/ssh/sshd_config

# 使用如下配置
PermitRootLogin yes
PubkeyAuthentication yes


# 重启服务
systemctl start ssh
```
