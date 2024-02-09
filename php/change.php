<?php

try{
    require_once "connection.php";
    $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

    $url_components = parse_url($_SERVER['REQUEST_URI']); 
    parse_str($url_components['query'], $params); 
            
    $login = "";
    $password =$params['password'];

    if(isset($params['login'])){
        $login = $params['login'];
        $sql = "UPDATE workers SET password = '$password', changed = '1' WHERE login = '$login'";
    }
    else{
        $login = $params['workersId'];
        $sql = "UPDATE workers SET password = '$password', changed = '1' WHERE workersId = '$login'";
    }

    if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:!*&^%$#@]+$/', $password) == false ){
        echo json_encode("Proszę wpisać poprawnie nowe hasło. Powinno zawierać conajmniej 5 znaków, cyfry i litery oraz znaki: :!*&^%$#@"); die();
    }
            
    if($polaczenie->query($sql)){ 
        $status = "1";
    }
    else{
        $status = "Błąd przy edycji bazy";
    }

    $polaczenie->close();	
    echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?> 