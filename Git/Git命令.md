# Git 命令

- `git clone url [workspaceName] -b [branch]`
  克隆仓库, 后面可以指定本地工作区的名字
  通过 `-b` 可以指定检出的分支

- `git add [文件名]`
  将文件添加到暂存区, `git add .` 添加所有文件

- `git restore --staged [filename]`
  取消文件的暂存, 通用使用 `.` 取消暂存所有

- `git status [文件名]`
  查看文件状态, 可以指定文件名, 不写查看暂存区的所有文件状态

- `git commit -m [message]`
  提交暂存区文件到服务器, 可以填写描述

- `git checkout -- file` 撤销文件的修改  

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

- `git remote -v`
  查看当前的远程仓库

  ```bash
  # 添加远程仓库
  git remote add [shortname] [url];

  # 查看远程仓库信息
  git remote show origin

  # 远程仓库的删除和重命名
  ## 改某个远程仓库在本地
  git remote rename [remote-name] [new name]
  ## 这个都是修改本地的仓库
  git remote rm [remote-name]

  ```

- `git fetch [remote-name]`
  从远程仓库抓取数据,此命令会到远程仓库中拉取所有你本地仓库中还没有的数据。运行完成后，你就可以在本地访问该远程仓库中的所有分支，将其中某个分支合并到本地，或者只是取出某个分支

- `git push [remote-name] [branch-name]`
  将本地仓库中的数据推送到远程仓库

- `git tag`

  ```bash
    # 列出已有标签
    git tag

    # 搜索标签
    git tag -l 'v.4.2.*'
  ```

  git 使用的标签类型有两种: 轻量级(lightweight) 和 含附注的(annotated).

  轻量级标签就像是个不会变化的分支，实际上它就是个指向特定提交对象的引用。而含附注标签，实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，电子邮件地址和日期，以及标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证。一般我们都建议使用含附注型的标签，以便保留相关信息；当然，如果只是临时性加注标签，或者不需要旁注额外信息，用轻量级标签也没问题。

  ```bash
    # 添加含有附注的标签
    git tag -a v1.4 -m 'xxxx'

    # 使用 git show 查看对应标签的版本信息
    git show v1.4

    # 添加轻量级标签
    git tag v1.4-lw

    # 后期加注标签
    ## 查看提交
    git log --pretty=oneline
    ## 对某次提交打tag (只要在打标签的时候跟上对应提交对象的校验和（或前几位字符）即可：)
    git tag -a v1.2 gfceb02

    # 删除标签
    git tag -d [tagName]
  ```

  默认情况下, git push 并不会把标签传送到远端服务器上, 只有显式命令才能分享标签到远端仓库.

  ```bash
    git push [remote-name] [tagname]

    # 一次推送所有 tag
    git push origin --tags
  ```

- 分支操作

  ```bash
    # 显示所有本地分支
    git branch

    # 列出所有远程分支
    $ git branch -r
    # 列出所有本地分支和远程分支
    $ git branch -a

    # 新建分支
    git branch name

    # 切换分支
    git checkout name

    # 新建并且直接切换
    git checkout -b name

    # 删除分支
    git branch -d name

    # 新建一个分支，指向指定commit
    $ git branch [branch] [commit]

    # 新建一个分支，与指定的远程分支建立追踪关系
    $ git branch --track [branch] [remote-branch]

    # 切换到指定分支，并更新工作区
    $ git checkout [branch-name]

    # 切换到上一个分支
    $ git checkout -

    # 建立追踪关系，在现有分支与指定的远程分支之间
    $ git branch --set-upstream [branch] [remote-branch]

    # 合并指定分支到当前分支
    $ git merge [branch]

    # 选择一个commit，合并进当前分支
    $ git cherry-pick [commit]

    # 删除分支
    $ git branch -d [branch-name]

    # 删除远程分支
    $ git push origin --delete [branch-name]
    $ git branch -dr [remote/branch]
  ```

  ```bash
    # 把一个分支中的修改整合到另一个分支的办法有两种：merge 和 rebase(衍合)
    $ git checkout experiment
    $ git rebase master
  ```

它的原理是回到两个分支最近的共同祖先，根据当前分支（也就是要进行衍合的分支 experiment）后续的历次提交对象（这里只有一个 C3），生成一系列文件补丁，然后以基底分支（也就是主干分支 master）最后一个提交对象（C4）为新的出发点，逐个应用之前准备好的补丁文件，最后会生成一个新的合并提交对象（C3'），从而改写 experiment 的提交历史，使它成为 master 分支的直接下游，如图 所示

![](img/18333fig0329-tn.png)

> 不要在分支合并之后再进行 rebase 操作
