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
	
	$imie  = $params['imie'];
	$nazwisko  = $params['nazwisko'];
	$nrTelefonu  = $params['nrTelefonu'];
	$ulica  = $params['ulica'];
	$nrBudynku  = $params['nrBudynku'];
	$nrLokalu  = $params['nrLokalu'];
	$miasto  = $params['miasto'];
	$idPracownika = $params['idPracownika'];
	

	$sql = "UPDATE workers SET  name = '$imie', surname = '$nazwisko', phoneNr = '$nrTelefonu', street = '$ulica', buldingNr = '$nrBudynku',
	localNr = '$nrLokalu', city = '$miasto'";

	if(isset($params['password'])){
	$password = $params['password'];
	$sql = $sql.", password = '$password', changed = '0'";
	}
	
	if(isset($params['login'])){
	$login = $params['login'];

	$sql2 = "SELECT * FROM administrators WHERE login = '$login'";

	if($wynik = $polaczenie->query($sql2)){
		$ilosc = $wynik->num_rows;
		if($ilosc > 0){
			echo json_encode("Proszę wpisać unikalny login pracownika"); die();
		}
	}

	$sql3 = "SELECT * FROM workers WHERE login = '$login'";

	if($wynik = $polaczenie->query($sql2)){
		$ilosc = $wynik->num_rows;
		if($ilosc > 0){
			echo json_encode("Proszę wpisać unikalny login pracownika"); die();
		}
	}


	$sql = $sql.", login = '$login'";
	}

	$sql = $sql." WHERE workersId = '$idPracownika'";


	if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ]+$/', $imie) == false ){
		echo json_encode("Proszę wpisać imię pracownika"); die();
	}
	
	if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ-]+$/', $nazwisko) == false ){
		echo json_encode("Prosze wpisać nazwisko pracownika."); die();
	}

	if(preg_match('/^[0-9+]+$/', $nrTelefonu) == false ){
		echo json_encode("Prosze wpisać numer telefonu. Zawierający tylko cyfry."); die();
	}
	
	if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ0-9. ]+$/', $ulica) == false){
		echo json_encode("Proszę wpisać nazwę ulicy."); die();
	}
	
	if(preg_match('/^[a-zA-Z0-9]+$/', $nrBudynku) == false ){
		echo json_encode("Proszę wpisać numer budynku."); die();
	}
	if(preg_match('/^[a-zA-Z0-9]+$/', $nrLokalu) == false ){
		echo json_encode("Proszę wpisać numer lokalu."); die();
	}

	if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ. ]+$/', $miasto) == false ){
		echo json_encode("Proszę wpisać miasto."); die();
	}

	if($polaczenie->query($sql)){
		$status = ["0", "Zmiany zostały zapisane.", $idPracownika];
			
	}
	else{
		$status = "Błąd przy edycji bazy danych";
	}
} 

$polaczenie->close();	
$myJSON = json_encode($status);
echo $myJSON;
?>