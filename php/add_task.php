<?php
try{
	require_once "connection.php";
	$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

	if ($polaczenie->connect_errno!=0) {
		$status = "Błąd: ".$polaczenie->connect_errno;
	}
	else{
		$sql = "SELECT * FROM tasks ORDER BY taskId ASC";

		if($wynik = $polaczenie->query($sql))
	{
			$wyniki = $wynik->fetch_all();
			$ilosc = $wynik->num_rows;
			$idZlecenia = $ilosc +1;

			if($ilosc-1 >= 0 && $idZlecenia <= $wyniki[$ilosc-1] ){
				for($i = 0; $i<$ilosc; $i++){
					if($wyniki[$i][0] !=  $i+1){
						$idZlecenia = $i+1;
						break;
					}
				}
			}

			$url_components = parse_url($_SERVER['REQUEST_URI']); 
			parse_str($url_components['query'], $params); 

			$tytuł  = $params['tytuł'];
			$ulica  = $params['ulica'];
			$nrBudynku  = $params['nrBudynku'];
			$nrLokalu  = $params['nrLokalu'];
			$miasto  = $params['miasto'];
			$opis  = $params['opis'];
			$pracownik  = $params['pracownik'];
			$dataZlecenia  = $params['dataZlecenia'];
			$nrTelefonu  = $params['telefonZlecenie'];
			$kategoria = $params['kategoria'];

			if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ0-9. -]+$/', $tytuł) == false ){
				echo json_encode("Proszę wpisać tytuł zgłoszenia"); die();
			}
			
			if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ0-9. ]+$/', $ulica) == false ){
				echo json_encode("Prosze wpisać nazwę ulicy."); die();
			}

			if(preg_match('/^[a-zA-Z0-9]+$/', $nrBudynku) == false ){
				echo json_encode("Prosze wpisać numer budynku. Zawierający cyfry, bądź litery."); die();
			}
			
			if(preg_match('/^[a-zA-Z0-9]+$/', $nrLokalu) == false ){
				echo json_encode("Prosze wpisać numer lokalu. Zawierający cyfry, bądź litery."); die();
			}
			
			if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ ]+$/', $miasto) == false ){
					echo json_encode("Proszę wpisać nazwę miasta. Powinno zawierać tylko litery."); die();
			}

			if(preg_match('/^[0-9+]+$/', $nrTelefonu) == false ){
				echo json_encode("Proszę wpisać poprawny telefon."); die();
			}

			if(preg_match('/^[\na-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ0-9:@!#$%^&*(),. -]+$/', $opis) == false ){
				echo json_encode("Opis może zawierać cyfry, litery bądź spacje oraz znaki specjalne: :@!#$%^&*(),.-"); die();
			}

			if(preg_match('/^[0-9-: ]+$/', $dataZlecenia) == false ){
				echo json_encode("Proszę wpisać poprawną datę zlecenia."); die();
			}


			$index1 = strpos($pracownik, ' ');
			$imie = substr($pracownik, 0, $index1);
			$nazwisko = substr($pracownik, $index1+1);

		
			if($wynikP = $polaczenie->query("SELECT workersId FROM workers WHERE name = '$imie' || surname = '$nazwisko' ")){
				$iluP = $wynikP->num_rows;
				if($iluP == 0){
					echo json_encode(['420', 'Podany pracownik nie istnieje.']); die();
				}
				else{
					$wynikP = $wynikP->fetch_row();
					$id = $wynikP[0];
				}
				
			}
			else{
				echo json_encode(['420', 'Bład']); die();
			}


			$sql = "SELECT categoryId FROM taskCategory WHERE category = '$kategoria' ";
			
			if($wynik = $polaczenie->query($sql)){
				$ilu = $wynik->num_rows;
				if($ilu > 0){
					$catId = $wynik->fetch_array();
				}
				else{
					echo json_encode("Błąd połączenia"); die();
				}	
			}

			$sql = "INSERT INTO tasks (taskId, title, catId, street, buldingNr, localNr, city, telephonNr, description, status, taskDate, workerId ) 
			VALUES ('$idZlecenia', '$tytuł', '$catId[0]', '$ulica', '$nrBudynku', '$nrLokalu', '$miasto', '$nrTelefonu', '$opis', 0, '$dataZlecenia', '$id')";
		
			if($polaczenie->query($sql)){
				$status = ["1", "Zlecenie zostało dodane"];
			}
			else{
				$status = "błąd przy dodawaniu do bazy";
			}

		}
		else{
			$status = "blad polaczenia";
		}

	} 	
	$polaczenie->close();	
	echo json_encode($status);

}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?>