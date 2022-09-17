<?php

include_once("db.php");  
  $sql = "SELECT * FROM `clients`";
  $result = mysqli_query($connection, $sql);
  $count = mysqli_num_rows($result); 
  echo $count;
?>


