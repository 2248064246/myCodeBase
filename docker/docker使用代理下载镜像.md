# docker 使用代理下载镜像

> 系统 deepin (Debain 内核)

国内使用代理加速镜像下载

```bash
vi /etc/systemd/system/multi-user.target.wants/docker.service

# 在 [Service] 下写入如下数据
[Service]
....
Environment=HTTP_PROXY=http://127.0.0.1:8118
Environment=HTTPS_PROXY=http://127.0.0.1:8118
Environment=NO_PROXY=localhost,127.0.0.1,192.*

```