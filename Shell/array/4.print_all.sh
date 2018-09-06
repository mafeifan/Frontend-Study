#!/bin/bash

# bash shell默认将变量看做是只有一个元素的数组用@和*可以表示数组的元素
# $@  $*表示传递到脚本的所有参数
# 当不用引号时，@和*完全等价，但是当使用引号时，*将数组所有元素打印在一行内，中间以IFS分隔 @是分行打印

#  当元素值含有空格要用""引号括起来
city[0]="he nan"
city[1]=NY
city[2]="puyang"

for i in "${city[@]}"
do
	echo $i
done

#注意上个例子的区别
# 改为 for i in ${city[*]}查看结果
for i in "${city[*]}"
do
	echo $i
done
