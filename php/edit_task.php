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
        
        $taskId = $params['taskId'];

        $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId where taskId = $taskId";

        if($wyniki = $polaczenie->query($sql)){
            $status = $wyniki->fetch_all();   
        }
        else{
            $status = "Nie ma takiego zlecenia";
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
