<?php
require_once "connection.php";
$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

$url_components = parse_url($_SERVER['REQUEST_URI']); 
parse_str($url_components['query'], $params); 
        
$old_pass =$params['oldpass'];
$password =$params['password'];
$login = $params['login'];

if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ0-9:@!$%#^&*()]+$/', $password) == false ){
    echo json_encode("Proszę wpisać poprawnie nowe hasło. Powinno zawierać conajmniej 5 znaków, cyfry i litery oraz znaki: :@!$%#^&*()"); die();
}

$sql1 = "SELECT * FROM administrators WHERE login = '$login' and password = '$old_pass' ";

if($wynik = $polaczenie->query($sql1)){ 
    $wynik = $wynik->num_rows;
    if($wynik > 0){
        $sql = "UPDATE administrators SET password = '$password' WHERE login = '$login'";

        if($polaczenie->query($sql)){ 
            $status = "1";
        }
        else{
            $status = "Błąd przy edycji bazy";
        }
    }
    else{
        $status = "Podaj poprawnie stare hasło";
    }
}
else{
    $status = "Błąd połaczenia";
}

$polaczenie->close();	
echo json_encode($status);
?> 