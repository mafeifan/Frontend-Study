#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

# Check if user is root
if [ $(id -u) != "0" ]; then
    printf "Error: You must be root to run this script!\n"
    exit 1
fi

printf "=========================================================================\n"
printf "重置mysql中root用户的登录密码 \n"
printf "For more information please visit http://www.lnmp.org \n"
printf "Usage: sh reset_mysql_root_password.sh\n"
printf "=========================================================================\n"

mysql_root_password=""
read -p "(请输入mysql的root用户的新密码):" mysql_root_password
if [ "$mysql_root_password" = "" ]; then
	echo "Error: Password can't be NULL!!\n"
	exit 1
fi

printf "正在关闭MySQL...\n"
# 也有可能是 /etc/init.d/mysql stop | start | restart
# 先查找 find /etc/init.d/ -name 'mysql*'
if [ -s /etc/init.d/mysqld ]; then
	_mysql=mysqld
	#/etc/init.d/mysqld stop
elif [ -s /etc/init.d/mysql ]; then
	_mysql=mysql	
	#/etc/init.d/mysql stop
else
	echo "Error: etc/init.d/下不存在mysql或mysqld \n"
	exit 1	
fi
/etc/init.d/$_mysql stop

printf "Starting MySQL with skip grant tables\n"
/usr/local/mysql/bin/mysqld_safe --skip-grant-tables >/dev/null 2>&1 &
printf "using mysql to flush privileges and reset password\n"
sleep 10
printf "update user set password = Password('$mysql_root_password') where User = 'root'\n"
/usr/local/mysql/bin/mysql -u root mysql << EOF
update user set password = Password('$mysql_root_password') where User = 'root';
flush privileges;
EOF

reset_status=`echo $?`
if [ $reset_status = "0" ]; then
	printf "Password reset succesfully. Now killing mysqld softly\n"
	killall mysqld
	sleep 10
	printf "Restarting the actual mysql service\n"
	#/etc/init.d/mysqld start
	/etc/init.d/$_mysql start
	printf "Password successfully reset to '$mysql_root_password'\n"
else
	printf "Reset MySQL root password failed!\n"
fi