## HTTP传输过程中的文本压缩

文件都扔在AWS S3上，发现下载很慢，前面没有挡CDN是一个原因，一些文本内容没有压缩也是很大的一个问题。

目前一些文本通过通过配置web服务器的gzip功能来实现传输过程中的文本压缩，因为绝大多数客户端默认支持gzip等传输压缩，所以这些配置是一个透明的过程，用户不会感知。比如访问一个网站，传输html,js,css等文本到底有没有压缩，浏览者不会有任何察觉。

但压缩之后传输量会大大减小，由此带来的用户体验会提升不少。通常的文本基本可以减少90%的传输内容。

### 如何判断当前服务器是否支持压缩

```
curl -I http://www.alo7.com/js/jquery-v1.8.0.js # 会显示header信息 

# 通常服务器，光这样请求是不会进行压缩的，一定要客户端告诉服务器他支持压缩，服务器才会返回压缩内容

curl -I -H "accept-encoding: gzip,deflate" http://www.alo7.com/js/jquery-v1.8.0.js # 加上相关的header信息
# 此时就会看到response的header中有
# Content-Encoding: gzip
```

有了`Content-Encoding: gzip` 客户端就知道传输过来的内容是压缩过的，客户端就会自动解压缩

### 启用压缩会有性能问题吗？

压缩肯定是很耗CPU的事情，但是很多场景都会使用gzip。

静态内容。绝大多数的静态内容都会开启gzip，但是类似nginx ， apache等服务器都会有策略，比如缓存已经gzip过的文件，这样下次访问，只需check原始文件是否有变动，如果没有变动只是读取之前gzip过的缓存文件给出来，所以并不是每次请求都需要做压缩工作。类似的策略会大大避免做压缩的工作。

非文本内容通常不做压缩。特别是jpg ， mp4等文件，那些文件本身就可能是一种压缩格式，再次做压缩耗费了大量cpu资源，基本压出来的内容和原始文件一样大，没有任何效果，徒增资源消耗。

动态网站。绝大多数的动态api是没有启用gzip的。一些原因，不像静态服务器，动态api根据用户每次请求都不同，不能和静态服务器一样缓存压缩内容。二则通常动态api返回的内容是非常有限的，通常就是一个简单的json， 加起来不会超过1k的占绝大多数，小文件压缩不会有帮助，甚至有可能会是内容变大。关于多大文件不适合压缩，有各种说法，有1.4k ， 5k ， 10k等。所以动态服务器绝大多数都没有开启gzip

但动态服务也可以启，以rails为例，加上 `Rack::Deflater`就能达到效果，也有些复杂的通过前端的nginx等静态webserver的配合实现内容压缩。

### 一个简单的压缩内容的对比

```
wget --header="accept-encoding: gzip,deflate" http://www.alo7.com/js/jquery-v1.8.0.js
# 下载下来一个 37K 的压缩文件
# 这个文件可以其实可以解压缩 
mv jquery-v1.8.0.js jquery-v1.8.0.js.gz
gunzip jquery-v1.8.0.js.gz


# 如果不加header会获得一个原始文本
wget http://www.alo7.com/js/jquery-v1.8.0.js

# 下载下来的文件大概 90K

# 没有达到压缩到原有1/10的效果是这个js本来就minimize了
```

### S3上尝试gzip支持

本来想在S3上实现gzip会很简单，后来发现根本就不支持。因为S3不是一个web server，而是一个 Simple Storage 

但确实有些讨巧的方案来显示近似gzip的操作

```
 # 有一个 filename.json
gzip -9 filename.json
mv filename.gz filename.json
# 先压缩一把，然后还是命名成json后缀
aws s3 cp --content-encoding 'gzip' filename.json s3://bucket/filename.json

# 把压缩文件copy上去，注意要加上 content-encoding

#浏览器访问正常 
https://bucket.s3.amazonaws.com/filename.json


# 问题1

## 如果上传的时候不指定 content-encoding
aws s3 cp  test2.json s3://bucket/test/test3.json
https://bucket/test/test3.json
# 访问的时候就会出错，客户端因为缺了这个header头导致不会去做解压缩的动作

# 问题2

## 如果上传时指定了content-encoding ， 但如果客户端不支持compress,同样有问题
wget https://bucket.s3.amazonaws.com/test/test2.json
## 不管有没有指定 accept-encoding 始终会给一个解压缩的内容
```

### 利用CDN实现压缩 , 配置fastly的实例

没法，还是找个cdn试下。

注册fastly之后在Hosts部分加上指定的域名

部分返回值因为S3上content type没指定，所以加了段 VCL snippet

```
if( req.url.ext == "png" ) {
  # Header rewrite set png content type : 10
  set beresp.http.content-type = "image/png";
  set beresp.http.cache-control = "max-age=890000000";
}

if( req.url.ext == "json" ) {
  # Header rewrite set png content type : 10
  set beresp.http.content-type = "application/json";
  set beresp.http.cache-control = "max-age=890000000";
}
```

cname到 `nonssl.global.fastly.net`

其余都挺简单，没啥好说的

