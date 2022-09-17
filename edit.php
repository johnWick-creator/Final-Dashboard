<?php include 'header.php';

$conn = mysqli_connect('localhost','root','','crud');
$std_id = $_GET['id']; //id beacuse it will take value from url bar id
$sql = "SELECT * FROM student WHERE sid = {$std_id} ";
$query = mysqli_query($conn , $sql);

if (mysqli_num_rows($query) > 0) {

?>
<div id="main-content">
    <h2>Update Record</h2>
    <form class="post-form" action="editdata.php" method="post">
    <?php
     
       
     while($row = mysqli_fetch_assoc($query)){

         ?>
      <div class="form-group">
          <label>Name</label>
          <input type="hidden" name="sid" value="<?php echo $row ['sid'];  ?>"/>
          <input type="text" name="sname" value="<?php echo $row ['sname'];  ?>"/>
      </div>
      <div class="form-group">
          <label>Address</label>
          <input type="text" name="saddress" value="<?php echo $row ['saddress'];  ?>"/>
      </div>
      <div class="form-group">
          <label>Class</label>
      
          <select name="sclass">
              <option value="">Select Class</option>
              <?php 
        $sql1  = "SELECT * FROM studentclass  ";
        $query1 = mysqli_query($conn , $sql1);
        if(mysqli_num_rows($query1) > 0){

            while ($row1 = mysqli_fetch_assoc($query1)) {
                  if($row['sclass'] == $row1['cid']){
                    $selectedcol="selected";
                  }else { 
                    $selectedcol = "";
                }
      
          ?>
              <option <?php echo $selectedcol?> value="<?php echo $row1 ['cid'];?>"><?php echo $row1 ['cname'];?></option>
              <?php
        }
          ?>
          </select>
          <?php
        }
          ?>
      </div>
      <div class="form-group">
          <label>Phone</label>
          <input type="text" name="sphone" value="<?php echo $row ['sphone'];  ?>"/>
      </div>


      <input class="submit" type="submit" value="Update"/>
    </form>

    <?php
        }
    }
        ?>
</div>
</div>
</body>
</html>
