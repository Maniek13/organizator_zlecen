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
    $opis = $params['opis'];

    if(preg_match('/^[\na-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ0-9:@!#$%^&*(),. -]+$/', $opis) == false ){
        echo json_encode("Opis może zawierać cyfry, litery bądź spacje oraz znaki specjalne: :@!#$%^&*(),.- i enter"); die();
    }


    if(isset($params['data'])){
        $data = $params['data'];
        $sql = "UPDATE tasks SET description='$opis', taskEndDate='$data', status='1' WHERE taskId = '$taskId' and workerId = '$workersId'";

        if(preg_match('/^[0-9: -]+$/', $data) == false ){
            echo json_encode("Proszę wpisać poprawną datę zlecenia."); die();
        }

        if($wynik = $polaczenie->query($sql)){
            $status = "1";
        }
        else{
            $status = "nie ma takiego zlecenia";
        }
    }
    else{
        $sql = "UPDATE tasks SET description='$opis' WHERE taskId = '$taskId' and workerId = '$workersId'";

        if($wynik = $polaczenie->query($sql)){
            $status = "2";
        }
        else{
            $status = "nie ma takiego zlecenia";
        }
    }
}

$polaczenie->close();	
echo json_encode($status);
?>