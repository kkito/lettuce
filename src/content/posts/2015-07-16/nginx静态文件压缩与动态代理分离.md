## Nginx 配置静态文件与动态请求分离，静态文件压缩


# 动静态请求分离

"""
include /etc/nginx/conf.d/*.conf; # nginx.conf会有这个配置，直接把相关网站配置放在 conf.d下

# 具体站点配置
server {
    listen       80 ;
    server_name  www.youhost.com;
        
    location /api/ {
        proxy_pass http://localhost:3839/api/; # 应用服务器的地址
    }
    
    location / {
        root /var/www/myapp/public; # 站点静态资源的地址
    }
}
"""

# 静态文件启用压缩
"""
# 全局启用在 nginx.conf下
...
http {
    ...
    gizp on; # 开启gzip
    gzip_comp_level 6; # 压缩的比率，耗cpu，但文件会小点
    gzip_min_length   10240; # 最小压缩文件的配置
    gzip_types   text/plain text/css  text/javascript application/javascript application/x-javascript; # 对于某些特殊的content type的请求压缩 html css js etc
}
"""

# 配置完之后如何尝试
"""
curl -H 'Accept-Encoding:gzip' theurl # 客户端测试下 ,看到乱码就对了
curl -H 'Accept-Encoding:gzip' theurl > result1
curl  theurl > result2 # 比对两文件大小
"""
