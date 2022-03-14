# Git 别名

可以通过设置别名的方法来减少每次命名的字符输入量(偷懒)

```bash
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```


更加高级的用法

```bash
$ git config --global alias.unstage 'reset HEAD --'

# 然后可以这样用
$ git unstage fileA

$ git config --global alias.last 'log -1 HEAD'

# 然后要看最后一次的提交信息，就变得简单多了：
$ git last
```

