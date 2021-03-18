<?php
require_once "connection.php";
$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

if ($polaczenie->connect_errno!=0) {
	$status = "Błąd: ".$polaczenie->connect_errno;
}
else{
	$sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId ORDER BY taskId ASC";

	

	if($wynik = $polaczenie->query($sql)){
		$status = $wynik->fetch_all();
	}
	else{
		$status = "Błąd polaczenia";
	}
} 

$polaczenie->close();	
$myJSON = json_encode($status);
echo $myJSON;
?>