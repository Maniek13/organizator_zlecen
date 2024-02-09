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

        $login  = $params['login'];
        $email = $params['email'];

        if(preg_match('/^[_a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+(\.[_a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+)*@[a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+(\.[a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+)*(\.[a-zA-Z]{2,3})$/', $email) == false ){
            echo json_encode("Proszę wpisać adres email"); die();
        }

        $sql = "UPDATE administrators SET email = '$email' WHERE login = '$login'";

        if($polaczenie->query($sql)){
            $status = "zmodyfikowano";
        }
        else{
            $status = "Błąd przy edycji bazy danych";
        }
    }

    $polaczenie->close();	
    echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?>