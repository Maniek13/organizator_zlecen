<?php
try{
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
			$login  = $params['login'];
			$nrTelefonu  = $params['nrTelefonu'];
			$ulica  = $params['ulica'];
			$nrBudynku  = $params['nrBudynku'];
			$nrLokalu  = $params['nrLokalu'];
			$miasto  = $params['miasto'];
			$password = $params['password'];

			$sql = "SELECT * FROM workers WHERE login = '$login'";

			if($wynik = $polaczenie->query($sql)){
				$ilosc = $wynik->num_rows;
				if($ilosc > 0){
					echo json_encode("Proszę wpisać unikalny login pracownika"); die();
				}
			}

			$sql = "SELECT * FROM administrators WHERE login = '$login'";

			if($wynik = $polaczenie->query($sql)){
				$ilosc = $wynik->num_rows;
				if($ilosc > 0){
					echo json_encode("Proszę wpisać unikalny login pracownika"); die();
				}
			}
			if(strlen($password) >= 5 ){
				echo json_encode("Hasło musi zawierać conajmniej 5 znaków"); die();
			}

			if(preg_match('/^[a-zA-ąćęłńóśóżźĄĆĘŁŃÓŚŻŹ]+$/', $imie) == false ){
				echo json_encode("Proszę wpisać imię pracownika"); die();
			}
			
			if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ-]+$/', $nazwisko) == false ){
				echo json_encode("Prosze wpisać nazwisko pracownika."); die();
			}

			if(preg_match('/^[0-9+]+$/', $nrTelefonu) == false ){
				echo json_encode("Prosze wpisać numer telefonu. Zawierający tylko cyfry."); die();
			}
			
			if(preg_match('/^[a-zA-Z0-9ąćęłńóśóżźĄĆĘŁŃÓŚŻŹ]+$/', $ulica) == false){
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

			
			if($wynik = $polaczenie->query("SELECT * FROM workers ORDER BY workersId ASC")){
				$ilosc = $wynik->num_rows;
				$idPracownika = $ilosc + 1;

				$wynik=$wynik->fetch_all();

				if($ilosc-1 >= 0 && $idPracownika <= $wynik[$ilosc-1] ){
					for($i = 0; $i<$ilosc; $i++){
						if($wynik[$i][0] !=  $i+1){
							$idPracownika = $i+1;
							break;
						}
					}
				}

				$sql = "INSERT INTO workers (workersId, name, surname, phoneNr, street, buldingNr, localNr, city, password, login) VALUES ('$idPracownika', '$imie', '$nazwisko', '$nrTelefonu', '$ulica', '$nrBudynku', '$nrLokalu', '$miasto', '$password', '$login')";

				if($polaczenie->query($sql)){
						
						$status = ["0", "dodano pracownika: ".$imie." ".$nazwisko." Id: ".$idPracownika, $idPracownika, $imie, $nazwisko];
						
				}
				else{
						$status = "Błąd przy dodawaniu do bazy";
				}
			}
			else
			{
				$status = "Bład polaczenia";
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