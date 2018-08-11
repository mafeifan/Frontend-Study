
# 让PHP生效


1. 进入主机

* playdocker_nginx_1 是容器名称，默认是当前目录名

docker exec -it playdocker_nginx_1 bash

2. 删除默认的default站点
rm /etc/nginx/conf.d/default

3. 重启

nginx -s reload