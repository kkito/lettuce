## git 多个仓库之前协同开发

### git remote

在一个git项目里运行``` git remote -v ```可以查看相关的remote信息

```
git remote -v 
origin  git@github.com:xxx/xxx.git (fetch)
origin  git@github.com:xxx/xxx.git (push)
```

可以通过 git remote add <name> <url> 的方式来添加一个远程仓库

```
# 在已有的git项目中运行
git remote add coding git@git.coding.net:xxx/xxxx.git

git remote -v # 查看
git merge coding/dev # 本地合并coding的dev分支

git remote update
git remote update coding # pull相关的数据

## 推送到远程
git push coding dev # 本地修改后推送到coding对应远程的dev分支
# [rejected]        dev -> dev (non-fast-forward)
git push coding HEAD:dev # ok
git push coding dev:dev # ok

# 最好整个分支 ， 本地整个远程的分支合并之后推上去
git branch -r 
# 会看到除了origin之外还有coding这个名字的远程库
git checkout -b coding/dev
git checkout -b coding/dev cdev
git merge dev
git push coding HEAD:dev


# 本地两个目录同样达到效果
git remote add localp ../localprojname
# 更新同样用remote update
# push上去的时候有些特殊
git push localp master
# [remote rejected] master -> master (branch is currently checked out)
# 切换项目换个分支就好了

```
