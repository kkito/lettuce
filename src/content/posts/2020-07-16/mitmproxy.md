## mitmproxy

https://mitmproxy.org/

https://github.com/mitmproxy/mitmproxy

名字猜测是 `man in the middle` 的意思,讨论下具体的使用和实现原理

### 通过工具查看请求内容

有很多类似的工具如大家都在用 `charlse` `fiddler` 等等

1. 启动服务

> `docker run --rm -it -p 8080:8080 mitmproxy/mitmproxy`

2. 设定proxy

> `export http_proxy=http://localhost:8080`

3. 访问

> `curl -v http://www.baidu.com`

4. 在跑docker的控制台上就可以看到请求内容, 回车查看request的具体内容


### https支持

1. 安装CA证书

> 访问 `http://mitm.it/` 照着流程走

2. mac下可以通过 `kaychain access` 查看到，注意要设为trust

3. 访问

> `export https_proxy=https://localhost:8080`
> `curl -v https://www.baidu.com` 注意是https

### 原理

#### http proxy

这里比较好实现，因为请求的内容都是明码的，通过请求体获得请求的内容和各种header 

然后把这些信息扔给正真的server，返回值给出来就可以

这应该有某种协议的

#### https proxy

相比http， https不好处理，因为内容是加密的，没法处理。

有另一种方案就是类似socks协议，工作在传输层，不管具体内容，就往管道里塞 `https://tools.ietf.org/html/rfc1928`

但mitm的方案不是这样，他构建了一个假的证书，客户端通过假的证书链把内容传过来，proxy直接解密，看到真实内容，然后再把真实内容发处理，这部分到是和http的流程一样了

#### 环境变量 http_proxy https_proxy

很多浏览器支持设定proxy， http_proxy , https_proxy是使用很广泛的环境变量，猜测可能是curl用了他，curl使用很广

除了支持http之外，很多也支持socks, eg  `export https_proxy=socks5://localhost:1887`

#### CA证书

要讲明白需要深入了解https的框架实现，包括证书，证书链，本地的CA等等,不赘述了
