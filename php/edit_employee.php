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
        
        $idPracownika = $params['idPracownika'];

        $sql = "SELECT * FROM workers where workersId = $idPracownika";
        
        if($wyniki = $polaczenie->query($sql)){
                $status = $wyniki->fetch_all();
                
        }
        else{
                $status = "Nie ma takiego pracownika";
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
