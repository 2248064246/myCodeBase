# Git 命令

+ `git clone url [workspaceName[`
克隆仓库, 后面可以指定本地工作区的名字

+ `git add [文件名]`
将文件添加到暂存区, `git add .` 添加所有文件

+ `git status [文件名]`
查看文件状态, 可以指定文件名, 不写查看暂存区的所有文件状态 

+ `git commit -m [message]`
提交暂存区文件到服务器, 可以填写描述
```
# 提交暂存区的指定文件到仓库区
git commit [file1] [file2] ... -m [message]


```