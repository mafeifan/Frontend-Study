#!/bin/bash

#  统计当前目录下目录和文件的个数


function sum(){
	let "n = $1+$2"
	echo "参数之和 $n=$1+$2"
}

echo "第一个参数：$1"
echo "第二个参数：$2"

sum $1 $2


