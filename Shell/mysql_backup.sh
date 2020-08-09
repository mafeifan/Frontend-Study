# 每日mysql数据库备份
# 0 3 * * * /home/ubuntu/backup/mysql_backup.sh >> /dev/null 2>&1


# 备份位置
backupdir=.

# 备份文件后缀时间
# $db_name$time.sql.gz  => foo_2018_02_26_03_00_01.sql.gz

time=_` date +%Y_%m_%d_%H_%M_%S `

# 需要备份的数据库名称
db_name=demo

# 需要备份的数据库地址
db_host=localhost

# 数据库用户名
user_name=root

# 用户密码
user_password=


# mysqldump
mysqldump -u$user_name -p$user_password -h $db_host --databases $db_name | gzip > $backupdir/$db_name$time.sql.gz

# 删除30天之前的备份文件
find $backupdir -name $db_name"*.sql.gz" -type f -mtime +30 -exec rm -rf {} \; > /dev/null 2>&1
