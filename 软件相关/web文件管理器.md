# web 文件管理器

## File Browser

[主页及安装教程](https://www.filebrowser.cn/)

## finder-web

这个安装比较负载, 需要`jdk` 和 `tomcat`

先安装 `jdk`

```shell
# 从官网下载
wget https://download.oracle.com/java/18/latest/jdk-18_linux-x64_bin.tar.gz

# 解压
tar -zvxf jdk-18_linux-x64_bin.tar.gz

# 添加环境变量
vi /etc/profile

# 加入下面配置
export JAVA_HOME=/usr/local/src/jdk/jdk1.8  #jdk解压的路径
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

# 查看是否配置成功
java -version

```

安装 `tomcat`

```shell
# 首先下载
wget https://www.apache.org/dist/tomcat/tomcat-8/v8.5.43/bin/apache-tomcat-8.5.43.tar.gz

# 改名
mv apache-tomcat-8.0.53 tomcat8

# 启动
cd tomcat8/bin
./startup.sh

# 停止
./shutdown.sh
```

安装 `finder-web`

[文档](http://www.finderweb.net/download.html)

```shell
wget http://www.finderweb.net/download/finder-web-2.5.8.war

# 解压
unzip finder-web-2.5.8.war

# 需要清空 tomcat 下的 webapps/ROOT 文件夹
# 将加压后的文件全部复制到 tomcat 文件的 webapps/ROOT/ 下
# 然后启动tomcat

# 默认用户名和密码 admin:1234
```