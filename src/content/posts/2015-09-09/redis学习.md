## Redis 学习

1. http://www.redis.cn/
1. https://github.com/JasonLai256/the-little-redis-book
1. 下载源码 http://download.redis.io/releases/redis-3.0.3.tar.gz
1. tar -xzf .. ; make ; #解压缩，编译
1. 生成的命令在 src目录下 redis-server , redis-cli
1. 启动server ./redis-server --port xxxxx ; ./redis-server -h 帮助
1. 启动客户端 ./redis-cli -p xxxxx
1. `set test "hello"`
1. `get test "hello"`
1. 5中数据结构 String , Hashes , List , Set , SortedHash
1. 对应的命令 get set append strlen , hset hget , lpush ltrim , sadd , zadd , zcount
1. `set users:9001 "{id: 9001, email: leto@dune.gov}" ; hget users:lookup:email leto@dune.gov` 有疑问，会解析字符串吗？lookup的时候效率会很慢吧？不会再放进去的时候就解析，要不慢爆了
1. pipelined 操作
1. 发布订阅
