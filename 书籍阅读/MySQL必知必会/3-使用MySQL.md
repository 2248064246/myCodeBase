# 适用MySQL

## 选择数据库

必须先适用 USE 打开数据库, 才能读取其中数据

`USE databaseName;`

## 了解库和表

使用 `SHOW` 命令来显示数据库和列表

`SHOW DATABASES;` 返回可用数据库的一个列表

`SHOW TABLES;`  返回一个数据库内的表的列表

`SHOW COLUMNS FROM tableName;` 显示表中的全部列表

其他的`SHOW`语句

+ `SHOW STATUS` 用于显示所有的服务器状态信息
+ `SHOW CREATE DATABASE` 和 `SHOW CREATE TABLE` 分别用显示创建特定数据库和表的MySQL语句
  + 例如`show create database mysql` 显示创建`mysql`数据库的语句
+ `SHOW GRANTS` 用来显示授予用户(所有用户或者特定用户)的安全权限
+ `SHOW ERRORS` 和 `SHOW WARNINGS` 用来显示服务器错误或警告消息

更多的`SHOW`语句可以使用 `help show` 来查看






