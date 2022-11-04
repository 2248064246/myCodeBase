# 网速和 ip 地址

## 测试网速

- **speedtest-cli**

  ```shell
    # 安装
    sudo pip install speedtest-cli
    # 测试
    speedtest
  ```

- **bench.sh**
  这是一位大佬写的检测系统和带宽测速的脚本
  ```shell
    git clone https://github.com/teddysun/across.git

    cd across

    bash bench.sh
  ```


## 检测 ip 地址

以下几个命令可以快速查看本机ip的信息
  ```shell
    # 这个直接通过浏览器访问能够获取更多信息
    curl ipinfo.io

    # 这个也支持中文信息返回
    curl cip.cc

    # 国内的
    curl myip.ipip.net
  ```