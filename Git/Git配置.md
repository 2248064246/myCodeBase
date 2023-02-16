# Git 配置

## 查看当前仓库配置

进入仓库, 然后 `git config -l`

- 查看系统 config `git config --system -l`
- 查看当前用户(全局)配置 `git config --global -l`
- 查看当前仓库配置信息 `git config --local -l`

## 配置代理

**全局代理**

```shell
git config --global http.proxy "socks5://xxx.xx.xx.x"

git config --global https.proxy "socks5://xxx.xx.xx.x"
```

**去除全局代理**

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

