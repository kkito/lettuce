## docker一些命令 start stop restart logs

一些问题深入学了还是受益颇多。

### 写了个demo代码如下

```python

# hello.py
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import signal


# Set the signal handler and a 5-second alarm


from tornado.options import define, options

define("port", default=8888, help="run on the given port", type=int)

def handler(signum, frame):
    print 'Signal handler called with signal', signum


class IndexHandler(tornado.web.RequestHandler):

    def get(self):
        greeting = self.get_argument('greeting', 'Hello')
        self.write(greeting + ', friendly user!')


if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application(handlers=[(r"/", IndexHandler)])
    signal.signal(signal.SIGALRM, handler)
    signal.signal(signal.SIGTERM, handler)
    print "in main"

    signal.alarm(5)
    print "after signal"
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
```


```
# Dockerfile

FROM python:2.7

EXPOSE 8888

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN pip install tornado

COPY hello.py .
COPY run.sh .

ENTRYPOINT ["python", "hello.py"]
# ENTRYPOINT ["./run.sh"]
```

```
## run.sh

#!/bin/sh

echo "start server"
python hello.py > log.log 2>&1
echo "finished server"
```

```
# 相关脚本
docker build -t mytest2 .
docker run -p 8888:8888 -it  --rm --name mytest mytest2
docker ps -a  
docker rm mytest
docker start mytest
# ...

```


### docker logs

```
docker logs name # 显示相关日志
docker logs --tail n name # 显示最后的几行
docker logs --tail n -f name # 就想tail -n -f 一样
```

那么问题来了，logs这些内容从哪里来的呢？ 文档说是`标准输出`的内容，linux标准输出的概念。一些讨论 [https://segmentfault.com/a/1190000010086763](https://segmentfault.com/a/1190000010086763) 。

那如果没有标准输出还有相关日志吗？

结论没有！把`Dockerfile`的entrypoint换成run.sh ,启动之后通过logs查看，只有那个echo。docker期望一个container启动一个进程，所以流程上是这样的。

### 后台运行docker

如果把`run.sh`的脚本改成 `python hello.py > log.log 2>&1 &` 加后台运行，就会发现docker ps里没找到。答案是

docker 容器默认会把容器内部第一个进程，也就是pid=1的程序作为docker容器是否正在运行的依据，如果docker 容器pid挂了，那么docker容器便会直接退出。
2.docker run的时候把command最为容器内部命令，如果你使用nginx，那么nginx程序将后台运行，这个时候nginx并不是pid为1的程序，而是执行的bash，这个bash执行了nginx指令后就挂了，所以容器也就退出了，和你这个一样的道理，pm2 start 过后，bash 的pid为1，那么此时bash执行完以后会退出，所以容器也就退出了。


### docker start做了什么

先说`docker run` 和 `docker start`的区别。 docker run就是 docker create +  docker start 。 create方法会创建一个container ， start是启动container 。 主要是执行CMD ， 关于 CMD和entrypoint这两个关系不在此讨论。

### docker stop 做了什么

docker stop会发一个SIGTERM信号给进程，（猜测应该是PID=1的主进程，和前面后台讨论的问题一样）。如果没搞定10秒钟之后发个SIGKILL信号。

SIGTERM就是 kill $pid , SIGKILL就是 kill -9 $pid

利用前面的python代码，handle 的相关信号，可以打印出日志看到


### docker restart 

没找到相关文档，但我自己尝试发现可能就是 stop + start 而已。

总结docker围绕着pid是1的进程做工作。
