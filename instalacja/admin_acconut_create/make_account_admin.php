<?php
require_once "connection.php";
$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

if ($polaczenie->connect_errno!=0) 
{
   $status = "Błąd: ".$polaczenie->connect_errno;
}
else
{
		$url_components = parse_url($_SERVER['REQUEST_URI']); 
		parse_str($url_components['query'], $params); 

		$login  = $params['login'];
		$hasło  = $params['hasło'];
		$email  = $params['email'];
		$imie  = $params['imie'];
		$nazwisko  = $params['nazwisko'];

		if(preg_match('/^[_a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+(\.[_a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+)*@[a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+(\.[a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+)*(\.[a-zA-Z]{2,3})$/', $email) == false ){
			echo json_encode("Proszę wpisać poprawny adres email"); die();
		}
	
		if(preg_match('/^[a-zA-ąćęłńóśóżźĄĆĘŁŃÓŚŻŹ]+$/', $imie) == false ){
			echo json_encode("Proszę wpisać poprawne imię"); die();
		}

		if(preg_match('/^[a-zA-ąćęłńóśóżźĄĆĘŁŃÓŚŻŹ-]+$/', $nazwisko) == false ){
			echo json_encode("Proszę wpisać poprawne nazwisko"); die();
		}
        
        $sql = "SELECT * FROM workers WHERE login = '$login'";
		if($wynik = $polaczenie->query($sql)){
			$ilosc = $wynik->num_rows;
			if($ilosc > 0){
				echo json_encode("Proszę wpisać unikalny login"); die();
			}
		}

		$sql = "SELECT * FROM administrators WHERE login = '$login'";

		if($wynik = $polaczenie->query($sql)){
			$ilosc = $wynik->num_rows;
			if($ilosc > 0){
				echo json_encode("Proszę wpisać unikalny login"); die();
			}

		}

        $sql = "INSERT INTO administrators (password, login, email, name, surname) VALUES ('$hasło', '$login', '$email', '$imie', '$nazwisko')";

            if($polaczenie->query($sql)){
					
					$status = "1";
					
            }
            else{
                    $status = "Błąd przy dodawaniu do bazy";
            }
        
} 
$polaczenie->close();
$myJSON = json_encode($status);
echo $myJSON;
?>