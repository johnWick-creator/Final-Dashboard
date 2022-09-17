<?php 
    include_once("db.php");
    if(isset($_GET['id'])){
        $sno = $_GET['id'];
        $delete = true;
        $sql = "DELETE FROM `clients` WHERE `id` = $sno";
        $result = mysqli_query($connection, $sql);
        header ("Location: http://localhost/test001/client.php");}
?>

   

   