<?php
require_once "connection.php";
$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

if ($polaczenie->connect_errno!=0) {
    $status = "Błąd: ".$polaczenie->connect_errno;
}
else{
	$sql = "SELECT * FROM workers ORDER BY workersId ASC";

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