<?php
try{
    require_once "connection.php";
    $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

    $url_components = parse_url($_SERVER['REQUEST_URI']); 
    parse_str($url_components['query'], $params); 

    $login = $params['login'];

    $sql = "SELECT changed FROM workers WHERE login =  '$login'";
            
    if($wyniki = $polaczenie->query($sql)){
        $wynik = $wyniki->fetch_all();
        $status = $wynik;    
    }
    else{
        $status = "Błąd przy komunikacji z bazą danych";
    }

    $polaczenie->close();	
    echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?> 