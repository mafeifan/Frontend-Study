<?php


header('Content-type: application/json');
//获取回调函数名
$jsoncallback = htmlspecialchars($_GET['callback']);
//json数据， 可以从数据库总获得
$json_data = '["customername1","customername2"]';
//输出jsonp格式的数据
// callbackFunction(["customername1","customername2"]) 共前台js调用
echo $jsoncallback . "(" . $json_data . ")";

