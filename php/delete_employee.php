<?php
try{
	require_once "connection.php";
	$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

	if ($polaczenie->connect_errno!=0){
		$status = "Błąd: ".$polaczenie->connect_errno;
	}
	else{
		$url_components = parse_url($_SERVER['REQUEST_URI']); 
		parse_str($url_components['query'], $params); 

		$idPracownika  = $params['idPracownika'];

		$sql = "DELETE FROM workers WHERE workersId = '$idPracownika' ";
		$sql2 = "DELETE FROM ussersemails WHERE workersId = '$idPracownika' ";


		if($polaczenie->query($sql)){
			if($polaczenie->query($sql2)){
				$status = "Usunięto";
			}
			else{
				$status = "Błąd przy usuwaniu z bazy";
			}
		}
		else{
			$status = "Błąd przy usuwaniu z bazy";
		}
	} 

	$polaczenie->close();	
	$myJSON = json_encode($status);
	echo $myJSON;
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?>