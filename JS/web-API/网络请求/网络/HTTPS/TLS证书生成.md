## 使用 openssl 生成自签名证书

首先, 先创建一个 `server-ext.cnf`文件,写入如下内容

```ini
subjectAltName=IP:127.0.0.1,IP:192.168.100.66,IP:192.168.100.68
```

这个是用于证书绑定的 ip 地址, 如果没有设置这个, 在连接的时候会报错.

```shell
# Generate CA private key
openssl genrsa -out ca.key 2048

# Generate CSR
openssl req -new -key ca.key -out ca.csr

# Generate Self Signed certificate（CA 根证书）
openssl x509 -req -days 365 -in ca.csr -signkey ca.key -out ca.crt -extfile server-ext.cnf

```

在第三步会要求输入国家, 地域等信息. 按要求格式填入就行

**查看证书**

```shell
# 可以查看生成的 ca.crt 证书内容
openssl x509 -in ca.crt -noout -text
```

**服务器使用**
服务器上需要的 `ca.crt` 和 `ca.key` 两个文件
