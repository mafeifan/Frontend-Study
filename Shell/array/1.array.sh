#! /bin/bash
#数组的定义1


#定义数组，=两边不要空格
name[0]=zhangsan
name[1]=mafei

#将一组数据赋值给数组
city=( zz henan puyang NY )

#打印数组
echo "name[0] = ${name[0]}"
echo "name[1] = ${name[1]}"

echo "city[0] = ${city[0]}"
echo "city[1] = ${city[1]}"
echo "city[5] = ${city[5]}"