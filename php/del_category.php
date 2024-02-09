<?php
try{
	require_once "connection.php";
	$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

	if ($polaczenie->connect_errno!=0) {
		$status = "Błąd: ".$polaczenie->connect_errno;
	}
	else{
		$url_components = parse_url($_SERVER['REQUEST_URI']); 
		parse_str($url_components['query'], $params); 

		$kategoria  = $params['kategoria'];

		$sql =  "SELECT * FROM taskCategory WHERE category = '$kategoria' ";

		if($wynik = $polaczenie->query($sql)){
			$ilu = $wynik->num_rows;
			if($ilu == 0){
				echo json_encode("Podana kategoria nie istnieje"); die();
			}	
		}

		$sql =  "DELETE FROM taskCategory WHERE category = '$kategoria' ";

		if($polaczenie->query($sql)){
			$status = "1";
		}
		else{
			$status = "Błąd przy usuwaniu";
		}
	}

	$polaczenie->close();	
	echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?>