## Jenkins Blue Ocean一个pipeline的例子

自认为对软件工程的实践和理解远超过周围很多同事，对于测试，对于持续集成。所以虽然没有深入研究过诸多持续集成项目，但也算是深度使用者了。很早之前的thoughtworks cruisecontrol ， gitlab ci的最好的rails版本都fork出来改了很多代码，加了不少功能上去。之前也搭过Jenkins，但这次折腾这个Blue Ocean真是要吐槽。

虽然跑通了，但还有不少问题，一些方案还是不够完整。可能没有完整通读文档，（TMD文档也太长了吧）总觉得似乎打开方式不大对。

### 安装Jenkins

直接用docker启动Jenkins

`docker run   -u root   --rm   -d   -p 8080:8080   -p 50000:50000   -v jenkins-data:/var/jenkins_home   -v /var/run/docker.sock:/var/run/docker.sock   jenkinsci/blueocean`

网上有很多例子不赘述

### 老版的集成方式和BlueOcean

进入界面，默认是老版的方式。左侧菜单也有一个 `打开 Blue Ocean` 的菜单。

官网说BlueOcean只是一个新界面，但我的理解这是两种完全不同的CI方式。或者说两种不同思路下导致页面完全不一样的呈现。

### 老版本的持续集成套路

很多几年前的方案都是这种老版的思路。

集成方式是，找一台机器，代码有变更的时候，通过主动定时pull或者被动触发，开始运行脚本。开始一次集成，脚本希望码农提供，但是由于各个项目不同，需要在机器上安装各种环境，比如java ， node等等，没有这些环境，根本就编译不起来。

比如要编一个Android apk 文件出来，那么在ci的主机上要装android sdk那一套。如果是ios，悲剧了，只能找个mac，通常会有个macmini做这事。

还有一些配置需要再机器上做的，如完成之后需要做一些artifacts的分发或者部署等工作。这些操作通常需要权限，那么在那台机器上需要把一些ssh key放上去。android那些keystore也要放机器上。

更有一些诸如数据库依赖等等都需要手动准备。

结论就是持续集成环境等于特殊搭建的，对于普通团队成员可能并不具备这样一个环境。（用puppet这种不讨论）

### 新版的思路

虚拟机的出现，特别是docker的盛行，突然改变上述思路。

如果还有一台物理机去做代码更新后的触发，调用脚本。那么这台机器有可能不用安装任何环境。只要启动对应的docker，在docker环境下运行即可。这事情就变的无比简单了。

新兴的CI工具都这么玩，gitlab CI ， Travis，包括这blue Ocean。

甚至那台物理机都不需要，如gitlab ，代码更新后直接启动一个docker跑，通过类docker compose的语法把所有依赖构建起来。

一些诸如ssh key等信息，gitlab CI统一使用`Variables`解决。所以gitlab ci就只需要一个类docker-compose的.gitlab-ci.yml文件，再加上一些环境变量就都搞定了。gitlab-ci文件里确实还有些配置需要去纠结。总体非常顺手好用。

travis ci在一些key上，还是比较麻烦，要通过命令行，生成一个加密的密钥放在配置文件中。

### Jenkins的插件

那些曾经引以为豪的插件，在docker面前完全悲剧了。没有一丝存在的意义，徒增复杂性。比如要某个功能，不是想着用个docker解决，而是让找个插件安装，然后给一堆复杂的配置给你，配置到底写那？我还要学groovy吗？还要指定一个java类？？

举个插件的例子。如上述的gitlab直接通过环境变量解决一些key的问题，但jenkins就要麻烦多了，在凭据里填，加一个凭据需要好多属性，用起来也要分各种情况，如
ssh登录需要

```
sshagent ( ['dev-tom-key']) {
# shell code 
}
```

拿一些密钥就要

```
withCredentials([usernameColonPassword(credentialsId: 'mylogin', variable: 'USERPASS')]) {
    sh ...
}
```

没走一步就要去读一个文档，抽象的不行


### Jenkins file的一个例子

构建一个node的项目，用ssh发布

```
pipeline {

    agent none
    stages {
        stage('Build') {
            agent { 
                docker { image 'node:8-alpine' }
            }
            steps {
                sh '''
                    pwd
                    yarn 
                    yarn generate
                    tar -cvf dist.tar dist
                '''
                archiveArtifacts artifacts: 'dist.tar', fingerprint: true
            }
        }
        stage('Test') {
            agent { 
                docker { image 'node:7-alpine' }
            }
            steps {
                sh 'ls -l'
                # run test here
            }
        }
        stage('Deploy') {
            agent any # 只能用any ， 要不sshkey拿不到， 为啥要叫 any ？
            steps {
                sh 'printenv'
                sh 'pwd'
                # 怎么拿到artifacts ， 目前是暴力那的
                sh 'ls /var/jenkins_home/jobs/official-site/branches/${BRANCH_NAME}/builds/${BUILD_ID}/archive/ -ltrh'
                sh 'tar -xvf /var/jenkins_home/jobs/official-site/branches/${BRANCH_NAME}/builds/${BUILD_ID}/archive/dist.tar'
                sshagent ( ['dev-tom-key']) {
                    sh '''
                        ls -l
                        ssh dev@server "ls -l /var/llbackend/nginx/"
                        scp -rp dist dev@server:/var/llbackend/nginx/testci
                    '''
                }
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
    }
}
```

