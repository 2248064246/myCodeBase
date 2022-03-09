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

# 提交工作区自上次commit之后的变化，直接到仓库区，跳过了add,对新文件无效
$ git commit -a -m [message]

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```

**重要: 修订提交**
如果我们提交过后发现有个文件改错了，或者只是想修改提交说明，这时可以对相应文件做出修改，将修改过的文件通过"git add"添加到暂存区，然后执行以下命令： 
`git commit --amend`

- `git reset --hard HEAD~1` 
这是撤销上一次提交
