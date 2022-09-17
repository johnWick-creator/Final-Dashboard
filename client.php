<?php
  $title = "List of Clients";
  include_once("inc/header.php");
  include_once("db.php");
  include_once("Modal.php");
?>

<?php          
  $sql = "SELECT * FROM `clients`";
  $result = mysqli_query($connection, $sql);
  $sno = 0;

      if(mysqli_num_rows($result) > 0) { 
        $row = $result;
        $showAdd = true;
        $showEdit = true;
         $showDelete = true;
?>
<div class="container">
 <div class="card">
   <div class="card-header">
     <nav class="navbar navbar-light">
        <h5 class="mb-0">Clients List</h5>
          <ul class="nav nav-pills">
            <li class="nav-item">
                <a href="addClient.php" class="btn btn-primary">Add clients</a>
              </li>
          </ul>
      </nav>
   </div>
   <div class="card-body">
     <div class="table-responsive">
       <table class="table table-hover table-bordered">
         <thead>
           <tr>
             <th>Sno</th>
             <th>F-name</th>
             <th>l-name</th>
             <th>Ph.no</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
          <?php
              $i = 1;
              foreach($row as $row) {
                $rowId = $row['id'];
                $editButton = "<a href='editclient.php?id=$rowId' class='btn btn-success'><i class='fa fa-pencil-circle'></i> Edit Client</a>";
                $deleteButton = "<a href='deleteclient.php?id=$rowId' class='btn btn-danger delUser'style='margin-left: 1rem;'><i class='fa fa-trash'></i> Delete</a>";
                $actionContent = "";
                if($showEdit) {
                  $actionContent .= $editButton;
                }
                if($showDelete) {
                  $actionContent .= $deleteButton;
                }
                
                $first_name = $row['first_name'] ;
                $last_name = $row['last_name'] ;
                $P_no= $row['P_no'] ;
                echo "<tr>";
                echo "<td>".$i."</td>";
                echo "<td>".$first_name."</td>";
                echo "<td>".$last_name."</td>";
                echo "<td>".$P_no."</td>";
                echo "<td>".$actionContent."</td>";
                echo "</tr>";
                $i++;
              }
           ?>
    <?php
    }
    else{
?>
          <h2 class="d-flex justify-content-center m-3">No clients</h2>
        <div class="container d-flex justify-content-center">
        <a href="addClient.php" class="btn btn-primary">Add clients</a>
        </div>
        <?php
    }

?>        
         </tbody>
       </table>
     </div>
   </div>

 </div>
</div>
<?php include_once("inc/footer.php"); ?>





