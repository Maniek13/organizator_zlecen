<?php
require_once "connection.php";
$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

if ($polaczenie->connect_errno!=0){
	$status = "Błąd: ".$polaczenie->connect_errno;
}
else{
	$sql = "SELECT * FROM tasks WHERE status = '0' ORDER BY taskId ASC";

	if($wynik = $polaczenie->query($sql)){
		$status = $wynik->fetch_all();
	}
	else{
		$status = "blad polaczenia";
	}
} 

$polaczenie->close();	
$myJSON = json_encode($status);
echo $myJSON;
?>