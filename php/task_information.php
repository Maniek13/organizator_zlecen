<?php
require_once "connection.php";
$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

if ($polaczenie->connect_errno!=0) {
    $status = "Błąd: ".$polaczenie->connect_errno;
}
else{
    $url_components = parse_url($_SERVER['REQUEST_URI']); 
    parse_str($url_components['query'], $params);
    
    $taskId  = $params['taskId'];
    $workersId = $params['usserId'];
    
    $sql = "SELECT * FROM tasks  LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE taskId = '$taskId' and workerId = '$workersId'";

    if($wynik = $polaczenie->query($sql)){
        $informacje = $wynik->fetch_array();
        $status = $informacje;
    }
    else{
        $status = "Nie ma takiego zlecenia";
    }
}

$polaczenie->close();	
echo json_encode($status);
?>