#! /bin/bash

# ./while_read_file.sh data.txt

# 定义变量filename，并将脚本的第一个参数赋值给此变量
filename=$1

if [ ! -f $filename ]
then
    echo "The file $filename doesn't exist."
    exit 1
fi

# 定义变量count，其值为0
count=0

while read LINE
do
    # 将变量count的值加1
    let count++
    # 打印变量count和LINE的值
    echo "$count $LINE"
done < $filename

echo -e "\nTotal $count lines read."

#退出脚本，且退出状态码为0
exit 0
