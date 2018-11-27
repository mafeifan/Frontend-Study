<?php


$fieldName = $_POST['name'];
$value     = $_POST['value'];
$id        = $_POST['pk'];


echo "sql: update tblName set {$fieldName}='{$value}' where id = {$id}";