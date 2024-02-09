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
        
        $taskId  = $params['taskId'];
        $workersId = $params['usserId'];

        $data = date('Y-m-d H-i-s');
        
        $sql = "UPDATE tasks SET status='1', taskEndDate='$data' WHERE taskId = '$taskId' and workerId = '$workersId'";

        if($wynik = $polaczenie->query($sql)){
            $status = "1";
        }
        else{
            $status = "Nie ma takiego zlecenia";
        }
    }

    $polaczenie->close();	
    echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?>