#!/bin/bash
# 2016.2.24
# 
# 一个批量下载图片的小程序
# 
# 如 开始数字为1，结束数字为100，通配符为3,下载地址为http://www.demo.com/(*).jpg。下载目录为test
# 则下载http://www.demo.com/001.jpg 到 http://www.demo.com/100.jpg 的100个文件。
# 自动打包为以下载目录命名的zip压缩包

# TODO
# 1. 文件列表导入模式，支持多地址批量下载
# 2. 必要的检测 如下载地址必须包含(*)  必填项没有填的情况
# 3. 循环逻辑优化 不使用seq -w

start_num="1"
read -p "开始数字(必填，默认1): " start_num
read -p "结束数字(必填): " end_num
place="3"

read -p "通配符长度(默认3): " place
read -p "下载地址[必填，必须带有(*)]: " url
read -p "保存目录(必填): " save_dir

echo "范围 ${start_num} - ${end_num};"
# TODO 回车后开始执行

count=$2

# TODO 待优化
if [ "$end_num" -lt 200 ];then
	count=200	
fi

for i in `seq -w 1 ${count}`
do
 if [ "$i" -le "$end_num" ]
 then	
 	echo ">>>>开始下载第${i}个文件"   
 	curPicUrl=${url/(*)/${i}}
 	echo ${curPicUrl}
 	wget -P "${save_dir}" ${curPicUrl}
 fi
done
zip -r ${save_dir}.zip ${save_dir}
##rm -rf ${save_dir}
echo "Task complete, Time: X; Total: ${end_num} pics"
