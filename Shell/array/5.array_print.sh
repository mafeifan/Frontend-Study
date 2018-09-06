#!/bin/bash
#打印所有数组元素

#自动检测文件的实例，不存在自动下载
tar=(pcre-7.7.tar.gz  pcre-8.12.tar.gz)
for i in ${tar[@]}
do
	if [ -s $i ]; then
	  echo "$i [found]"
	  else
	  echo "Error: $i not found!!!download now......"
	  wget -c http://soft.vpser.net/web/pcre/$i
	fi
done