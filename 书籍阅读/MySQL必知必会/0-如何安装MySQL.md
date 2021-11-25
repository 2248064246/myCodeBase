# MySQL 安装

## windows 环境

安装版本 5.7.34

### 下载 MySQL

下载地址推荐 http://mirrors.ustc.edu.cn/mysql-ftp/Downloads/

### ini配置文件

在解压后的目录中添加一个名为`my.ini`的配置文件

文件内容为
```INI
	[client]
	#设置端口号
	port=3306
	#设置字符的编码模式
	default-character-set=utf8
	[mysqld]
	port=3306
	character-set-server=utf8
	#设置为安装目录
	basedir="D:/MySQL/mysql-5.7.34-winx64"
	#设置数据目录
	datadir="D:/MySQL/mysql-5.7.34-winx64/data"
	sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
	#开启查询缓存
	explicit_defaults_for_timestamp=true
	#跳过授权表格  在第一次 登入时跳过密码
	#skip-grant-tables
	#数据库导出目录
	secure-file-priv = "D:/MySQL/mysql-5.7.34-winx64/export"
	[WinMySQLAdmin]
	Server ="D:/MySQL/mysql-5.7.34-winx64/bin/mysqld.exe"
	# 这里有个大坑，在导出数据的时候一直报 1290 错误，
	# 这里设置 的路径可以不用双引号， 可以使用 / 或者 \ 都行
	# 但是在 数据库客户端 要导出数据 路径必须 用 / 分隔开， 不能使用 \, 切记
  # select * from stu order by score desc into outfile 'D:/MySQL/MyData/stu.txt

```

### 创建 data 文件夹

这个不应该手动创建, 而是需要运行 命令

进入`bin`目录下, 在cmd中执行下面命令

`.\mysqld --initialize-insecure --user=mysql`

执行完之后, 在解压目录下会自动创建一个`data`文件夹

### 配置环境

创建新的系统变量
+ 变量名: `MYSQL_HOME` 
+ 变量值: 解压目录
  
给Path添加新值
+ `%MY_SQL%\bin`

### 安装 SQL
**运行管理权限cmd,** 执行 mysqld -install

### 启动服务
运行管理员权限cmd, 执行 `net start mysql`

### 修改 root 密码

首次进入由于跳过了密码, 所以不需要输入密码就能进入. 

这里由于原始密码时随机的, 需要自己设置一下密码

```sql
use mysql;
update user set authentication_string=password('12345') where user='root'; 
```