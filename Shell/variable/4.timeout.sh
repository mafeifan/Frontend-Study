#!/bin/bash

#	TMOUT 命令
#	Shell脚本的过期时间


TMOUT=3
echo -n "请在三秒内输入你的姓名，否则程序退出:"
read fname
if [ -z "$fname" ]
then
	fname="no answer"
fi
echo "your name is $REPLY"