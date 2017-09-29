<?php

$filename = time().substr($_FILES['photo']['name'], strrpos($_FILES['photo']['name'],'.'));

$response = array();

if (move_uploaded_file($_FILES['photo']['tmp_name'], $filename)){
  $response['isSuccess'] = true;
  $response['photo']  = $filename;
  $response['name']   = $_POST['name'];
  $response['gender'] = $_POST['gender'];
}else{
  $response['isSuccess'] = false;
}

echo json_encode($response);
?>
