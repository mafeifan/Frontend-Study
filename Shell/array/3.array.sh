#!/bin/bash
#数组的学习

# bash shell默认将变量看做是只有一个元素的数组用@和*可以表示数组的元素
# $@ $*表示传递到脚本的所有参数

key=value

echo ${key[@]}
echo ${key[*]}
echo ${key[0]}
echo ${key[1]}