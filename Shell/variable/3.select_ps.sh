#!/bin/bash

#	select 命令
#	提供一组字符串供用户选择，不必输入完整字符串，输入相应的序号进行选择

#输入select命令后，提示符变为了#? 可由PS3设置

#修改提示符
PS3="输入数字序号:"
export PS3
echo "请选择一种颜色"
select var in "Red" "Blue" "Yellow"
do 
	echo "The \$REPLY is $REPLY"
	echo "您选择的颜色是:$var"
break
done