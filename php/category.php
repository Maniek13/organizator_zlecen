<?php
try{
    require_once "connection.php";
    $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

    if ($polaczenie->connect_errno!=0) {
        $status = "Błąd: ".$polaczenie->connect_errno;
    }
    else{
        $sql = "SELECT category FROM taskCategory ORDER BY category ASC";
        
        if($wyniki = $polaczenie->query($sql)){
            $status = $wyniki->fetch_all();  
        }
        else{
            $status = "error category";
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
