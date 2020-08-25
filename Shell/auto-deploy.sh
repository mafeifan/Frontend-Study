# 2018-04-12
# 保持仓库代码为最新
# 通过计划任务，调用该脚本，对比本地和远程的commit_id，如果不一样就执行更新代码重启等操作。
# add the below line to crontab
# */1 * * * * cd /home/ubuntu/node-live-api/current && ./auto-deploy.sh > /dev/null

#!/bin/bash

git remote update

LOCAL=$(git rev-parse @)

REMOTE=$(git rev-parse "origin/master")

if [ $LOCAL = $REMOTE ];then
 echo "up-to-date" > /dev/null
else
 git checkout master
 git pull && npm install && sudo pm2 reload node-live-api
fi
