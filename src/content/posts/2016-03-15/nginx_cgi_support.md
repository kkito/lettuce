# nginx 支持 cgi

cgi 有时候够简单，够方便

1. centos上搭建参考[https://www.howtoforge.com/serving-cgi-scripts-with-nginx-on-centos-6.0-p2](https://www.howtoforge.com/serving-cgi-scripts-with-nginx-on-centos-6.0-p2)
1. fcgiwrap , spawn-fcgi
1. spawn fcgi的配置文件中FCGI_USER和FCGI_GROUP 需要和nginx相同的，有些事nginx，有些是web
1. 运行cgi的时候有时候需要一些全局变量env的传入，在nginx.conf中通过fastcgi_param配置，如fastcgi_param NODE_PATH /usr/lib/node_modules
