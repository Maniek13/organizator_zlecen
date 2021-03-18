<?php
require_once "connection.php";
$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

if ($polaczenie->connect_errno!=0) {
    $status = "Błąd: ".$polaczenie->connect_errno;
}
else{
    $sql = "SELECT * FROM administrators ORDER BY surname ASC";
    
    if($wyniki = $polaczenie->query($sql)){
        $status = $wyniki->fetch_all();   
    }
    else{
        $status = "Błąd przy komunikacji z bazą danych";
    }

} 
$polaczenie->close();	
$myJSON = json_encode($status);
echo $myJSON;
?>
