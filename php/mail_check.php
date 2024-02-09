<?php
try{
  require_once "connection.php";
  $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

  $url_components = parse_url($_SERVER['REQUEST_URI']); 
  parse_str($url_components['query'], $params); 

  $from = $params['from'];

  if ($polaczenie->connect_errno!=0){
    $status = "Błąd: ".$polaczenie->connect_errno;
  }
  else
  {
    $sql = "SELECT `email` FROM `ussersEmails`  WHERE `workersId_email` = '$from'";
    if($wynik = $polaczenie->query($sql)){
      $wynik = $wynik->fetch_array();
      if($wynik != null){
        $status = $wynik[0];
      
      }
      else{
        $status = "0";
      }
    }
    else{
      $status = "420";
    }
    $polaczenie->close();	

  } 

  echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?>