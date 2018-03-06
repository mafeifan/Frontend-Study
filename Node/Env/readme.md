PM2 env 测试 v2.10.1

## 根据配置文件启动node，并按照production环境
pm2 start ecosystem.config.js --env prod

## 启动后reload不会导致环境丢失
pm2 reload ecosystem.config.js

## 切换环境 --update-env实际用途好像有问题
pm2 restart ecosystem.config.js --env dev