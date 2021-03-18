<?php
require_once "connection.php";

$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

if ($polaczenie->connect_errno!=0){
	$status = "Błąd: ".$polaczenie->connect_errno;
}
else{
	$url_components = parse_url($_SERVER['REQUEST_URI']); 
	parse_str($url_components['query'], $params); 

	$idZlecenia  = $params['idZlecenia'];
	$sql = "DELETE FROM tasks WHERE taskId = '$idZlecenia' ";
	
	if($polaczenie->query($sql)){
		$status = "usunięto";
	}
	else{
		$status = "Błąd przy usuwaniu z bazy";
	}
} 

$polaczenie->close();	
$myJSON = json_encode($status);
echo $myJSON;
?>