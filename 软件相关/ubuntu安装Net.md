# Ubuntu 安装 .net

```shell
apt-get update
apt-get install snapd

# 所搜可用包
snap find dotnet


# 安装 .net 包
snap install dotnet-sdk --classic
snap alias dotnet-sdk.dotnet dotnet

# 验证已安装的快照包的列表。
snap list
# 验证 Dotnet 安装。
 dotnet --info
```

> 实际上这个方法不大行

以下是可用的方法 [参见](https://blog.csdn.net/sD7O95O/article/details/117432862)


```shell
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb


sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-5.0


sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-5.0


  sudo apt-get install -y dotnet-runtime-5.0
```



