<?php
try{
	require_once "connection.php";
	$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

	if ($polaczenie->connect_errno!=0) {
	$status =  "Błąd: ".$polaczenie->connect_errno;
	}
	else{
		$url_components = parse_url($_SERVER['REQUEST_URI']); 
		parse_str($url_components['query'], $params); 

		$kategoria  = $params['kategoria'];
		$stara  = $params['stara'];
		

		if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ0-9. -]+$/', $kategoria) == false ){
				echo json_encode("Proszę wpisać nazwę"); die();
		}
		
		$sql = "UPDATE taskCategory SET category= '$kategoria' WHERE category = '$stara'";
		
		if($polaczenie->query($sql)){
				$status = "1";
		}
		else{
				$status = "błąd przy edycji bazy";
		}
	}

	$polaczenie->close();	
	echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?>