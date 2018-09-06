## nginx 配置 Basic auth 和Digest auth

basic和digest的区别略过，简单的登录

### 通过docker启动一个普通的nginx

```
docker pull nginx
docker run -d --rm -p 8081:80 nginx
```

访问本机 8081端口就可以访问nginx了

### basic的配置

[http://nginx.org/en/docs/http/ngx_http_auth_basic_module.html](http://nginx.org/en/docs/http/ngx_http_auth_basic_module.html)

只需配置 `auth_basic string | off;` 和 `auth_basic_user_file file;` 既可

### 关于 auth_basic_user_file

如何生成`auth_basic_user_file` , 该文件形如


```
name1:$apr1$C32pWeKQ$uJiVDFTKSHu7kQt9NQYMd.
name2:$apr1$smbtGy1N$arGnNg4VQMSRifoEB98CW/
```

冒号前是用户名 ， 冒号后面是一个digest的密码 ，apr1。关于apr1见 [https://httpd.apache.org/docs/2.4/misc/password_encryptions.html](https://httpd.apache.org/docs/2.4/misc/password_encryptions.html) ,  [https://asecuritysite.com/encryption/apr1](https://asecuritysite.com/encryption/apr1) 

通过执行 `openssl passwd -apr1 yourPassword` 来生成密码


### 编译一个支持basic的docker镜像

一共三个文件

```
# cat htpasswd
name1:$apr1$C32pWeKQ$uJiVDFTKSHu7kQt9NQYMd.
name2:$apr1$t2H/cTZz$5lPx136tnbus4vZw0ibx51

#cat default.conf
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
                auth_basic      "kktest demo";
        auth_basic_user_file /etc/nginx/htpasswd;
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}

#cat Dockerfile
FROM nginx

ADD default.conf /etc/nginx/conf.d/default.conf
ADD htpasswd /etc/nginx/

```

`docker build -t nginx_with_basic .` build docker image

### 启动镜像 

`docker run -d --rm -p 8081:80 nginx_with_basic` 就可以启动镜像了。

启动之后访问 `http://localhost:8081/` 就可以看到密码提示框 输入用户名 `name2` , 密码 `yourPassword` 。


### digest auth

[https://www.nginx.com/resources/wiki/modules/auth_digest/](https://www.nginx.com/resources/wiki/modules/auth_digest/)

basic是明文传送的，只是base64了一下，在header里。使用digest auth比较安全，流程上每次请求都会有一个 `nonce` ,通过`realm`用户的用户名密码生成一个md5后的碰撞值。

但nginx的auth_digest默认是不带的，找一个第三方的镜像

`docker pull joelnb/nginx-digest`

### 编译一个digest docker

同样的密码问题 

`htdigest -c passwd.digest 'this is not for you' admin` 生成密码文件 

`Usage: htdigest [-c] passwordfile realm username` 

realm 不知道能不能通过参数传进去，可以进去看下具体配置。这里不纠结。

```
# cat  Dockerfile
FROM joelnb/nginx-digest

COPY ["passwd.digest", "/opt/httpd/conf/passwd.digest"]
```

通过Dockerfile生成镜像  `docker build -t nginx_with_digest .`

启动镜像 `docker run --rm -p 8081:80 nginx_with_digest`

尝试访问以下  `curl --digest --user admin:admin  -v "http://localhost:8081/private/"`
