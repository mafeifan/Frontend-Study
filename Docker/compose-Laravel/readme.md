
# 安装PHP
默认是php7.0.31，如果需要装其他版本，修改php/Dockerfile中的第一行
FROM php:x.x.x-fpm

# 连接MySQL
容器之间有自己的网络。

当连接MySQL，host填写localhost不行的话
先进入容器的bash，执行
`/sbin/ip route|awk '/default/ { print $3 }'`
获取IP，比如返回172.17.0.1

# 进入容器

1. 进入容器

* playdocker_nginx_1 是容器名称，默认是当前目录名

docker exec -it playdocker_nginx_1 bash

2. 删除默认的default站点
rm /etc/nginx/conf.d/default

3. 重启

nginx -s reload

# 参考：
https://segmentfault.com/a/1190000013020851