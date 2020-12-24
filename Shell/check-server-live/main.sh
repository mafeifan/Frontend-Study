#! /bin/bash
# 检测服务器存活状态

TIMESTAMP=`date +%Y%m%d%H%M%S`
CURRENT_HTML=${TIMESTAMP}.html
CURRENT_INDEX=index.html
LN=/bin/ln
RM=/bin/rm
# 读取 server_list 文件
SERVER_LIST=server_list
# 创建 HTML
cat <<EOF > $CURRENT_HTML
<html>
<head>
  <title>Server Alive Monitor</title>
</head>
<body>
  <table width="50%" border="1" cellpadding="1" cellspacing="0" align="center">
    <caption><h2>Server Alive Status</h2></caption>
    <tr>
      <th>Server IP</th>
      <th>Server Status</th>
    </tr>
EOF


while read SERVERS
do
  # 如果ping的结果返回o则状态是0K的，同时显示字体的颜色为blue
  # 如果ping的结果返回非0则状态是FALSE的，同时显示字体的颜色为red
ping $SERVERS -c 3 > /dev/null;
if [ "$?" == "0" ]; then
STATUS=OK
COLOR=blue
else
  STATUS=FALSE
  COLOR=red
fi
echo "<tr><td>$SERVERS</td><td><font color=$COLOR>$STATUS</font></td></tr>" >> $CURRENT_HTML
done < $SERVER_LIST

cat <<EOF >> $CURRENT_HTML
</table>
</body>
</html>
EOF
