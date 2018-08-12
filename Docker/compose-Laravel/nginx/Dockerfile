FROM nginx:1.10

# 注意 ubuntu 通过 apt-get install 安装的有 sites-enabled 和 sites-available 目录

ADD default.conf /etc/nginx/conf.d/default.conf
ADD nginx.conf /etc/nginx/nginx.conf
ADD mkdir.sh /opt/

RUN chmod +x /opt/mkdir.sh && /opt/mkdir.sh
