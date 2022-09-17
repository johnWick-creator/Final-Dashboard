<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <style>
.modal-dialog {
    position: absolute !important;
    right:0% !important;
    margin: auto;
    width: 21% !important;
    height: 23%;
    top:0% !important
}
.modal-content {
    height: 100%;
}

</style>
  <link rel="stylesheet" href="modal.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  </head>
  <body>

  
<!-- Modal -->
<div class="modalplace">
<div class="modal fade" id="exampleModal" tabindex="1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h7 class="modal-title">Notification</h7>
      </div>
      <div class="modal-body">
        <h5 class="text-center">Client Status Changed</h6>
      </div>
      <div class="modal-footer">
        <div class="row">
          <div class="col text-center">
                    <button type="button" class="btn btn-primary text-center mr" onclick="javascript:window.location.reload()">Relode page</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"
></script>



<!-- Jquery for modal -->

<div id="recallphp" style="visibility: hidden;">
  <?php include_once("modalcount.php");?>   
</div>
    

<!-- check modal count after every 3 seconds     -->
<script type="text/javascript">  
  setInterval( function(){load_data();}, 3000);
  function load_data(){
     $('#recallphp').load(location.href + " #recallphp");
  }
</script>

<?php   
  include_once("db.php");       
  $result = mysqli_query($connection, "SELECT * FROM `clients`");
  $row= mysqli_num_rows($result);
?>


<!-- obtain value from recall php tag every 3 seconds -->
<script type="text/javascript">
  setInterval( function(){return (load());}, 3000);
  function load(){
    if(document.getElementById('recallphp').innerHTML != null){
      var checkcount =  document.getElementById('recallphp').innerHTML;
    }
    var firstcount = '<?php echo $row; ?>';    
    // extrack number only and change to srting 
    let reg = /\d+/g;
    let rslt = checkcount.match(reg);    
    let final = String(rslt[0]);
    // campare both values
    if(firstcount === final ){
       console.log("change status: none")
    }
    else{
        $('#exampleModal').modal('show')
    }
  }

  

</script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
  </body>
</html>


