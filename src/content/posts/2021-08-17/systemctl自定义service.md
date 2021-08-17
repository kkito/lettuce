## systemctl 自定义 service

之前都使用 `/etc/init.d/xxxx` 现在看来逐步都被systemctl所替代了
大量的系统级的应用都采用这个方案来管理，似乎和unix的哲学相违背，但确实方便，好找问题

### 编写一个service配置

```
[Unit]
Description=Fnproj server
Wants=network-online.target
After=network.target
[Service]
Type=simple
Restart=on-failure
RestartSec=55s
ExecStart=/usr/local/bin/fn start -d
ExecStop=/usr/local/bin/fn stop
[Install]
WantedBy=multi-user.target
```


### 复制配置到systemd的目录下

`cp xxxx.service /etc/systemd/system/`


### 启动服务

`systemctl start xxxx.service` # 对应 ExecStart
`systemctl stop xxxx.service` # 对应 ExecStop

还有其他如ExecReload, 各种Pre等等不赘述

### 期外死掉之后会重启

Restart保证服务存活，否则系统会帮着自动重启

### 日志查看

`journalctl -u fnproj` 查看日志 

systemd有一组命令，不赘述

