

# `Nginx` 配置

## 关于 `root` `alias`
> `root`处理结果是: `root`路径 + `location` 路径

> `alias`处理结果是: 使用`alias`路径替换`location`路径

+ `alias` 路径后面必须跟 '/', `root` 可有可无

```json
  // 请求 /a/index.html
  location /a {
    root html; // => 结果是 html/a/index.html
  }

  location /a {
    alias html/; // => 结果是 html/index.html
  }

```


## 反向代理

```json
  location /protal {
    proxy_pass   http://localhost:9080/;
    proxy_intercept_errors on;
  }

  location /cas {
    proxy_pass   http://localhost:9090/;
    proxy_intercept_errors on;
  }
```
```javaScript
  // 注意 proxy_pass 末尾写 '/' 和不写 '/'的区别
  // 假定访问: http://192.168.1.1/proxy/test.html
  //   1. proxy_pass http://127.0.0.1/ => 代理到 http://127.0.0.1/test.html
  //   2. proxy_pass http://127.0.0.1  => 代理到 http://127.0.0.1/proxy/test.html
  //   3. proxy_pass http://127.0.0.1/aaa/ => 代理到 http://127.0.0.1/aaa/test.html
  //   4. proxy_pass http://127.0.0.1/aaa  => 代理到 http://127.0.0.1/aaatest.html
```

## 自定义 `50x` `404` 错误

```json
  server {
    proxy_intercept_errors on;

    error_page  404              /404.html;
    error_page   500 502 503 504  /50x.html;
    location = /500.html {
      root   html/static;
    }
    location = /404.html {
      root   html/static;
    }
  }
```