</main>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
  <script src="//cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <script src="assets/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/dist/js/chart.min.js"></script>
  <script src="assets/dist/js/jquery.serializeObject.min.js"></script>
  <script src="assets/dist/js/app.js"></script>
  <?php
    if(isset($jsFiles) && sizeof($jsFiles) > 0){
      foreach($jsFiles as $jsFile){ ?>
          <script src="assets/dist/js/<?= $jsFile; ?>"></script>
  <?php } 
  } ?>



  </body>

</html>
<?php ob_end_flush(); ?>
