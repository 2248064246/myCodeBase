
# deepin 挂载共享目录

windows共享的目录可以再 deepin 中挂载

`mount //192.168.124.2/f /mnt/share -o username="2248064246@qq.com",password="HYL123xxx",dir_mode=0777,file_mode=0777`

`/mnt/share` 是将windows分享的目录挂载到这个目录

`dir_mode=0777,file_mode=0777` 这个是赋予删除和新建权限

虽然使用的username是windows的管理员用户， 对这个目录有读写权限， 但是不使用上面代码， 还是无法删除和新建文件


可以使用 `df -h` 查看已挂载的文件


## 取消挂载

`umount //192.168.124.2/f` 这样就能取消挂载


