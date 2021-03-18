<?php
require_once "connection.php";
$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

$url_components = parse_url($_SERVER['REQUEST_URI']); 
parse_str($url_components['query'], $params); 

$login = "";
$password =$params['password'];

if(isset($params['login'])){
    $login = $params['login'];
    $sql = "SELECT * FROM workers WHERE login =  '$login' and password = '$password'";
}
else{
    $login = $params['workersId'];
    $sql = "SELECT * FROM workers WHERE workersId =  '$login' and password = '$password'";
}


if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:!*&^%$#@]+$/', $password) == false ){
    echo json_encode("Proszę wpisać poprawnie stare hasło. Niedozwolone znaki."); die();
}

if($wyniki = $polaczenie->query($sql)){
    $ilosc = $wyniki->num_rows;
    if($ilosc !== 0){
        $status = "ok"; 
    }
    else{
        $status = "Prosze wpisać poprawnie stare hasło";
    }
}
else{
    $status = "Błąd komunikacji z bazą danych";
}

$polaczenie->close();	
echo json_encode($status);
?> 