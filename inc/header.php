<?php
ob_start();
include_once('functions.php');
checkLogin(true);
$loggedUserData = checkIfLogged(true);
if(empty($title)) {
  $title = "Page";
}
$loggedUserId = $loggedUserData->id;
$sidebarPages = getEverythingFromTable("pages", "WHERE sidebar = 0");
$loggedUserRole = getUserRole($loggedUserData->id);

// Full URL without hash
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

if(!isset($basenameFile)) $basenameFile = basename(__FILE__);
// Full URL without basename / parameters / hash
$full_url = substr($actual_link, 0, strpos( $actual_link, $basenameFile));

// Full URL without parameters / hash
$full_url_wbasename = strtok($actual_link, '?');

$protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http")."://";
// Domain name with protocol
$domain = $protocol.$_SERVER['HTTP_HOST'];

// filename current page
$currentPage = $basenameFile;

// Breadcrumb
$crumbs = explode("/",str_replace($domain, '', $full_url_wbasename));
$crumbs = array_filter($crumbs);


?>
<!doctype html>
<html lang="fr">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="Idov Mamane">
  <title><?= $title; ?></title>
  <!-- Bootstrap core CSS -->
  <link href="assets/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- override Bootstrap core CSS -->
  <link href="assets/dist/css/bootstrap-override.css" rel="stylesheet">
   <!-- bootstrap-icons core CSS -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
   <!-- Font Awesome icons -->
   <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet">
   <!-- Select2 -->
   <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
   <!-- Datatable -->
   <link rel="stylesheet" href="//cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css">
  <!-- custom core CSS -->
  <link href="assets/dist/css/custom.css" rel="stylesheet">
</head>

<body>
  <a class="sidebar-overlay" ></a>
  <div class="container-fluid">
    <div class="row main-con">
      <div class="col-md-3 col-lg-2 sidebar-style p-0 left-bar mob-menu">

      <!-- Sidebar -->
      <div id="sidebarMenu" class="bg-gradient-darkgreen sidebar h-100 d-flex flex-column">
        <div class="text-center pt-3">
          <!-- <a class="navbar-brand" href=""><img src="#" class="img-fluid" width="200"></a> -->
        </div>
        <div class="position-sticky  navbar-dark pt-3">
          <ul class="nav navbar-nav flex-column">
            <?php foreach($sidebarPages as $sidebarPage){ ?>
              <li class="nav-item">
                <a class="nav-link <?php if($currentPage == $sidebarPage["filename"]) { echo "active"; } ?>" aria-current="page" href="<?= $sidebarPage["filename"] ?>"> <i class="bi <?= $sidebarPage["icon"] ?> menu-icon"></i> <span style="vertical-align:3px;"><?= getTranslation($sidebarPage["shortname"]) ?></span> </a>
            </li>
            <?php }  ?>
            <a class="nav-link  ?>" aria-current="page" href="client.php"> Client </a>
          </ul>
        </div>
      </div>
    </div>

    <!-- Top Bar -->
    <div class="col-md-12 col-lg-10 p-0 main-content offset-lg-2">
      <header class="py-3 mb-3 border-bottom bg-white header-con">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-between">
            <ul class="nav navbar-light col-12 col-sm-auto me-lg-auto mb-2 justify-content-start mb-md-0">
              <li><a href="#" id="menu-onoff" class="menu-onoff nav-link px-3 pt-1 link-secondary"><span class="navbar-toggler-icon"></span></a></li>
              <li><a href="#" id="menu-onoff-mob" class="menu-onoff-mob nav-link px-3 pt-1 link-secondary"><span class="navbar-toggler-icon"></span></a></li>
            </ul>

            <div class="d-flex col-12 col-sm-auto  justify-content-center">
              <div class="dropdown text-end pe-5">
                <a href="#" class="d-block link-dark text-decoration-none " id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://www.gravatar.com/avatar/b624ad71c5fb4f6991b66de3fb4de252?s=80&d=mp&r=g" alt="logo utilisateur" width="32" height="32" class="rounded-circle">
                </a>
                <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                  <li><a class="dropdown-item logout" href="#"><?= getTranslation("signOut"); ?></a></li>
                </ul>
              </div>
             </div>
          </div>
          <div class="px-3 border-top mt-2 pt-2">
            <ul class="nav navbar-light pt-2">
              <?php
                $maxCrumbs = count($crumbs) - 1;
                $i = 0;
                $lastLink = $domain;
                foreach($crumbs as $crumb) {
                  if(!empty($crumb)) {
                    $lastLink .= "/$crumb";
                    $crumb = str_replace(".php", "", $crumb);
                    $crumb = getTranslation($crumb);
                    if($i == $maxCrumbs) {
                      echo "<li class='text-muted px-2'> ".ucfirst($crumb)." </li>";
                    }
                    else {
                      echo "<li><a href='$lastLink' class='nav-link px-2 py-0 link-dark'>".ucfirst($crumb)."</a></li> /";
                    }
                    $i++;
                  }
                }
              ?>
            </ul>
          </div>
      </header>

    <main class="header-space">
