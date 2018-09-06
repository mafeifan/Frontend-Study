#!/bin/bash

#	read 读取

#	read 命令格式  read variable 
#	当不带任何变量名，read就将读到的标准输入存储到reply变量中

echo -n "input your name"
read
echo "your name is $REPLY"


echo "input your name"
read fname
echo "your name is $fname"
echo "\$REPLY is $REPLY"