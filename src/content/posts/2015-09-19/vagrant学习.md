## 学习使用vagrant

1. 首先安装virtualbox
1. 安装vagrant，mac下有安装包
1. shell 下 vagrant命令有了 ; vagrant -h 
1. box的概念，先要安装box ； vagrant box -h ; vagrant box add  ubuntu/trusty64 ; vagrant box add hashicorp/precise32
1. 可以看到box vagrant box list
1. Vagrantfile 配置文件； 简单生成  vagrant init ubuntu/trusty64 ; 会在当前目录下生成，后续操作也在当前目录下
1. 启动虚拟机 vagrant up
1. ssh登陆进去 vagrant ssh ; 进去就是shell ， exit退出
1. 关闭虚拟机 vagrant halt
1. 自己编译一个box ； 当前执行的box可以通过 vagrant package生成一个box文件
1. 自定义box的使用 ; vagrant init package.box ; vagrant up ; 启动ok

