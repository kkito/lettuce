## Celery启动参数 autoscale concurrency pool 到底怎么选？

celery有官方的文档 [autoscale](https://docs.celeryproject.org/en/latest/userguide/workers.html#autoscaling)

[concurrency](https://docs.celeryproject.org/en/latest/userguide/concurrency/index.html)

但都讲的不够清晰， 都不如 [https://www.distributedpython.com/2018/10/26/celery-execution-pool/](https://www.distributedpython.com/2018/10/26/celery-execution-pool/)

相关的认识都是基于上面的文章

### 通常的启动过程

标准流程启动 celery `celery -A web.celery_app worker` 就启动了一个celery worker可以进行处理task。

因为通过redis等mq来处理消息，所以也可以把worker认为是一个mq模型里的consumer

此时查看下相关进程 `ps aux| grep celery` ,就发现启动一堆进程, 大概数量是cpu核心数 + 2

猜测下这种设计的原因，celery需要处理的task可能是需要耗费cpu资源的，所以为了有一个通用的模型，利用cpu数量作为worker数量
如果只启一个，task就需要一个个排队慢慢执行，是一个最简单的mq模型，只有一个consumer

### 没有那么多的task,启动很多process看着心烦咋办?

很多场景，没有很多并发，加上有些32核的服务器，就发现有一大堆进程，如果实际上只有一两个task同时发过来，感觉浪费太多，此时可以执行参数

`celery -A web.celery_app worker --concurrency=2`

通过指定concurrency 数量可以改变默认的cpu核心数作为concurrency的特性

此时通过 `ps` 查看，发现进程少了很多，还是 n + 2 ，另外那2个进程不在次赘述


#### concurrency可以超过cpu核心数吗？

`celery -A web.celery_app worker --concurrency=60`

没有任何问题，cpu数量只是出于性能和资源的权衡设定的一个默认值

### 如果能启一个，我直接手动启两个进程如何

通过 `concurrency` 可以改变，就会想到另外一种套路，设置成1，但使用shell下再启动一个worker如何?

`celery -A web.celery_app worker --concurrency=1`

`celery -A web.celery_app worker --concurrency=1`

首先确认这种做法也可以跑起来，并不会出错，这仰仗于mq模型带来的便利，但相比于设置 concurrency=2, 这样不但会新建 n + 2 里的2会多些进程，而且从内存消耗来说会比concurrency 还是差很多

如果设定 concurrency > 1 , 多出的进行通过 multiprocess 来实现的，通常的使用fork，在某个运行节点开始多出一份，虽然看上去是两个进程的，但在fork之前的内存由于使用copy on write的思路，都不会真正消耗实际物理内存，如果fork之前消耗内存100m，fork之后消耗5m， 使用concurrency就是 100m + 5m x 2, 命令行启2个就是 2 x (100m + 5m)

所以一边建议一台机器只移动一个worker，通过concurrency 启动多个 `worker process`

### task动态变化该怎么办？

实际情况会比较复杂，有时没几个task，有时来很多，虽然可以concurrency 直接启动n个，内存浪费也不是很多的，按处于精益求精的考虑，还是希望有更好的方案，这时可以通过autoscale 来

`celery -A web.celery_app worker --autoscale=12,2`

见文档，这样启动默认有2个worker process ,但可以随着task并发数量自动scale出新的进程来，最多12个

如果同时设定了autoscale 和 concurrency 以哪个为准？

自己测试了下，以autoscale 为准

### cpu 消耗型 vs io消耗型

之前内容都强调cpu消耗型所以很多默认值是这么设置的，如果task是io 密集型，是不是这个模型就不适合，比如都是http请求，或者都是查数据库。

简单起见可以把max_concurrcy 设高些，但还有更好的方案，更改pool，默认是使用prefork模型(fork出一个process来)

还有很多其他模型。

上述那些问题理清楚就可以细读最开始介绍的那篇了
