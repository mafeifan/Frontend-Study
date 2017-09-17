config_file=".git/config"

showGitInfo()
{
	name=`grep 'name =' ${config_file}`
	email=`grep 'email =' ${config_file}`

	echo '当前Git信息:'

	echo $name
	echo $email
}

switchGitAccount()
{
	read -p "输入要切换的帐号数字 1:finley, 2:wynn, 3:lishasha: " num

	if [ "$num" -eq 1 ];then
	    sed -i 's/email = .*/email = maf@shinetechchina.com/g' ${config_file}
	    sed -i 's/name = .*/name = finley/g' ${config_file}
	fi

	if [ "$num" -eq 2 ];then
	    sed -i 's/email = .*/email = wangyanan@shinetechchina.com/g' ${config_file}
	    sed -i 's/name = .*/name = wangyanan/g' ${config_file}
	fi

	if [ "$num" -eq 3 ];then
	    sed -i 's/email = .*/email = liss@shinetechchina.com/g' ${config_file}
	    sed -i 's/name = .*/name = lishasha/g' ${config_file}
	fi
}

if [ ! -f "$config_file" ]
then
	echo '找不到Git配置文件，默认会找当前目录下的.git/config文件'
	read -p ''
else
	showGitInfo 
	echo '====================================='
	switchGitAccount
fi