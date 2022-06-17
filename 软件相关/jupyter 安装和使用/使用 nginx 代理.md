
nginx 配置
```
	location /jupyter {
	    proxy_pass http://127.0.0.1:8888/jupyter; # jupyter服务器地址
    	proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade; # 加上解决了websocket问题
          proxy_set_header Connection "upgrade"; # 加上解决了websocket问题


		}
```


jupyter 需要配置 

```
allow_origin: *
base_url: /jupyter/
```
