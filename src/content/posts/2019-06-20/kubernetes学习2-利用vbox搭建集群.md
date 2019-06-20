## kubernetes学习2 - 利用vbox搭建集群

minikube在一台机器上搭建k8s环境，更偏向学习些，想要试些集群，可以用vbox更好的模拟下。

开始使用centos，搞了半天没成功，换成Ubuntu搞定了

### 装机

1. vbox中安装ubuntu server 版本
2. 安装一些必要的依赖 docker kubelet kubeadm kubernetes-cni 等
3. 复制了当前镜像，一个当node， 一个当master。复制镜像问题，导致后面碰到了hostname冲突的问题。

### 创建master

1. root用户登录
2. `swapoff -a` 关闭交换内存, k8s不让用, `free` 查看下确认没问题
3. 如果之前已经跑过了要重来删除相关，配置 `kubeadm reset -f` ,kubectl的配置 `rm -rf ~/.kube/`
4. `kubeadm init --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers --apiserver-advertise-address 192.168.99.107 --pod-network-cidr 172.30.0.0/16` 创建master ， 指定的apiserver的ip , pod-network cidr ??
5. 根据上述命令的输出，准备下 `.kube` 目录
6. `kubectl get nodes` 查看下master的情况
7. 应用下flannel `kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml` flannel 是k8s依赖的底层网络框架， 但不明白为啥不默认安装好，还要搞这些幺蛾子
8. 过几分钟 `kubectl get nodes` 确认下master是否Ready

### 创建node

1.  root登录，关闭swap
2. `hostnamectl set-hostname ubuntu-k8s-node1` 换个hostname
3. 清理掉之前的安装信息 
4. 在master上执行 `kubeadm token create --print-join-command` 打印出node 加入的命令
5. 在node上执行
6. master上执行 `kubectl get nodes` 查看下 node是否起来了,要等些时间
7. `kubectl label node ubuntu-k8s-node1 node-role.kubernetes.io/node=` 指定下node的role

### 创建一个hello word 跑下

1. master 上执行 `kubectl create deployment hello-node --image=epsilon2019/hello-minikube-zero-install` 
2. `kubectl get deployments` 查看情况 或者 `kubectl get pods` or `kubectl describe deployments` or `kubectl describe pods`
3. 确认下deployment 没问题 ， pod 没问题, 有问题可以通过describe查看具体情况，有类似 `ErrImagePull` ， `ImagePullBackOff`等
4. 暴露端口出来 `kubectl expose deployment hello-node --type=NodePort --name=example-service --port=8080` 使用NodePort会在node上开启一个端口
5. `kubectl get services` 查看下暴露的端口
6. 访问 `curl -v "http://192.168.99.108:30688"` 成功， 但用localhost不行，这里也没搞明白
