## kubernetes学习1 - 使用minikube安装kubectl

纯学习用，使用本地环境，官网上很多都利用 [katacoda](https://www.katacoda.com/) 来实现教学，也挺方便。

### 上下文和目标

k8s不单单提供容器化编排，比如docker compose，是更纯粹的容器编排，使用起来就很方便，只需在docker已有的功能上稍做添加即可。k8s还提供管理集群等更云的功能，所以导致环境更加复杂。要流程跑起来，不单单本地有一个操作命令行工具，还需要有server配合，才能实现添加、删除一个新服务等操作。这些操作其实全都在server上执行，和当前cli的环境没有关系。

那问题复杂了，server怎么搭建，server上要安装什么？本地需要装哪些工具？`minikube` 就可以一站式解决这些问题。

之前折腾过一阵 [openwhisk](https://openwhisk.apache.org/) 一个serverless的框架，可以在本地用docker来实现，也包含了类似apiserver等服务，但列出了一组docker compose数量很惊人，也依赖本地的各种端口，一不小心端口占用等的问题就启动不起来。但serverless不需要关心各种ip，端口等问题，所以一旦启动起来就ok了。k8s就要关心这些问题，这也是为啥它不能只依赖docker compose。

所以k8s是需要环境的，要么各种云服务，要么类似vbox 

`brew cask install virtualbox` 

### minikube

`brew cask install minikube`

安装`minikube`和`virtualbox`并不依赖，但是启动minikube是依赖vbox的

https://kubernetes.io/docs/setup/minikube/

https://kubernetes.io/docs/tasks/tools/install-minikube/

`minikube start` 本地跑起来报错,原因是启动服务需要安装一堆镜像，但那些镜像默认都在 `k8s.gcr.io` 上, 被墙掉了。看到网络上各种方法，但看了下`minikube`上就有方案。

`minikube start -h` 中有一行

> --image-repository string           Alternative image repository to pull docker images from. This can be used when you have limited access to gcr.io. For Chinese mainland users, you may use local gcr.io mirrors such as registry.cn-hangzhou.aliyuncs.com/google_containers

所以启动命令换成 `minikube start --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers`

如有问题，删除之后重新start `minikube stop` `minikube delete`

### kubectl

`minikube` start成功之后就有 `kubectl` 了

`kubectl version`

> Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.3", GitCommit:"2bba0127d85d5a46ab4b778548be28623b32d0b0", GitTreeState:"clean", BuildDate:"2018-05-21T09:17:39Z", GoVersion:"go1.9.3", Compiler:"gc", Platform:"darwin/amd64"}
> Server Version: version.Info{Major:"1", Minor:"14", GitVersion:"v1.14.1", GitCommit:"b7394102d6ef778017f2ca4046abbaa23b88c290", GitTreeState:"clean", BuildDate:"2019-04-08T17:02:58Z", GoVersion:"go1.12.1", Compiler:"gc", Platform:"linux/amd64"}

之后走官网demo

[https://kubernetes.io/docs/tutorials/hello-minikube/](https://kubernetes.io/docs/tutorials/hello-minikube/)

注意 `kubectl create deployment hello-node --image=gcr.io/hello-minikube-zero-install/hello-node` 依赖于被墙掉的镜像，而且由于这个过程是在vbox里实现的，所以即使本地shell下有梯子，或者本地已经有镜像，都不顶用。要么整个网络都可以翻，要么另找一个镜像，docker hub上搜一下会有一堆
··
如出错可以通过 `minikube dashboard` 打开控制面板看看具体情况

