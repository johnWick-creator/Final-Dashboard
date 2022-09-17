<?php 
  include_once("inc/header.php");
  include_once("db.php");

  if(isset($_GET['id'])){
    $sno = $_GET['id'];
    $sql = "SELECT * FROM `clients` WHERE `id` = $sno";
    $result = mysqli_query($connection, $sql);
    if(mysqli_num_rows($result) > 0) { 
      $row = $result;
      $i = 1;
      foreach($row as $row) {
        $first_name = $row['first_name'] ;
        $last_name = $row['last_name'] ;
        $P_no= $row['P_no'] ;
        $i++;
      }
    }
        
  }
?>

<?php 

  if($_SERVER["REQUEST_METHOD"]=="POST"){
    $fname = $_POST["first_name"];
    $lname = $_POST["last_name"];
    $pno = $_POST["pno"];
    $sql="INSERT INTO `clients` (`id`, `first_name`, `last_name`, `P_no`) VALUES (NULL, '$fname', '$lname', '$pno')";
    $query = mysqli_query($connection , $sql);
    if($query){
      header ("Location: http://localhost/test001/client.php");
    }
  }

?>
                
<div id="main-content">
  <form class="post-form" action="editclient.php" method="post">
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Edit client</h5>
      </div>


    <div class="card-body">
      <div class="form-group row">
        <label class="col-form-label col-md-2" for="first_name">first name: <span class="text-danger">*</span></label>
        <div class="col-md-10">
          <input type="text" name="first_name" class="form-control" placeholder="<?php echo $first_name; ?>" required>
          <div class="invalid-feedback usernameInvalid" style="display: none;"></div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="form-group row">
        <label class="col-form-label col-md-2" for="last_name">last name: <span class="text-danger">*</span></label>
        <div class="col-md-10">
          <input type="text" name="last_name" class="form-control" placeholder="<?php echo $last_name; ?>" required>
          <div class="invalid-feedback usernameInvalid" style="display: none;"></div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="form-group row">
        <label class="col-form-label col-md-2" for="pno">Pno: <span class="text-danger">*</span></label>
        <div class="col-md-10">
          <input type="text" name="pno" class="form-control" placeholder="<?php echo $P_no; ?>" required>
          <div class="invalid-feedback usernameInvalid" style="display: none;"></div>
        </div>
      </div>
    </div>
      <div class="card-footer">
        <input class="btn btn-primary" type="submit" value="Edit client"  />
      </div>
    </div>
  </form>
</div>
</div>
</body>
</html>
