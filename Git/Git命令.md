# Git 命令

- `git clone url [workspaceName[`
  克隆仓库, 后面可以指定本地工作区的名字

- `git add [文件名]`
  将文件添加到暂存区, `git add .` 添加所有文件

- `git restore --staged [filename]`
取消文件的暂存, 通用使用 `.` 取消暂存所有

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
  这是撤销上一次提交, 这个只能撤销本地工作区的代码, `--hard ` 也可以接指定提交编号(通过 git log 查看)

- `git log `
  查看提交记录

```bash
# 图形化显示提交纪律
git log --graph

# 显示提交的文件变化, -2表示显示最近两次的提交
git log -p -2

# 查看改动摘要
git log --stat -2

# 格式化提交记录
git log --pretty=format:"%h - %an, %ar : %s"

选项 说明
    -p 按补丁格式显示每个更新之间的差异。
    --stat 显示每次更新的文件修改统计信息。
    --shortstat 只显示 --stat 中最后的行数修改添加移除统计。
    --name-only 仅在提交信息后显示已修改的文件清单。
    --name-status 显示新增、修改、删除的文件清单。
    --abbrev-commit 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。
    --relative-date 使用较短的相对时间显示（比如，“2 weeks ago”）。
    --graph 显示 ASCII 图形表示的分支合并历史。
    --pretty 使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式）。

# 限制输出长度, 下面的命令列出所有最近两周内的提交：
$ git log --since=2.weeks

选项 说明
    -(n) 仅显示最近的 n 条提交
    --since, --after 仅显示指定时间之后的提交。
    --until, --before 仅显示指定时间之前的提交。
    --author 仅显示指定作者相关的提交。
    --committer 仅显示指定提交者相关的提交。
```
