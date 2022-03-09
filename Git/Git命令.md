# Git 命令

- `git clone url [workspaceName[`
  克隆仓库, 后面可以指定本地工作区的名字

- `git add [文件名]`
  将文件添加到暂存区, `git add .` 添加所有文件

- `git status [文件名]`
  查看文件状态, 可以指定文件名, 不写查看暂存区的所有文件状态

- `git commit -m [message]`
  提交暂存区文件到服务器, 可以填写描述

```bash
# 提交暂存区的指定文件到仓库区
git commit [file1] [file2] ... -m [message]

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]
```
