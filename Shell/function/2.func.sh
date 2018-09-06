#!/bin/bash

#  统计当前目录下目录和文件的个数


function dir_count(){
	let "filenum=0"
	let "dirnum=0"
	for file in `ls`
	do
		if [ -d $file ]
		then
			let "dirnum=dirnum+1"
		else
			let "filenum=filenum+1"	
		fi
	done
	echo "The number of directories is $dirnum"
	echo "The number of files is $filenum"
}

dir_count
