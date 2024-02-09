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

			$idZlecenia = $params['idZlecenia'];
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
				echo json_encode("Opis może zawierać cyfry, litery bądź spacje oraz znaki specjalne: :@!#$%^&*(),.- i enter."); die();
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

			
			$data = null;
		

			$sql = "SELECT categoryId FROM taskCategory WHERE category = '$kategoria' ";
			
			if($wynik = $polaczenie->query($sql)){
				$ilu = $wynik->num_rows;
				if($ilu > 0){
					$catId = $wynik->fetch_array();
				}
				else{
					echo json_encode("Błąd kategorie"); die();
				}	
			}

			$sql = "UPDATE tasks SET title= '$tytuł', catId ='$catId[0]', street='$ulica', buldingNr='$nrBudynku', localNr='$nrLokalu', city='$miasto', telephonNr='$nrTelefonu', description='$opis',
			status='0', taskDate='$dataZlecenia', taskEndDate='$data', workerId = '$id' WHERE taskId = '$idZlecenia'";
			if($polaczenie->query($sql)){
				$status = ['1', 'Zlecenie zostało edytowane'];
			}
			else{
				$status = "Błąd połączenia";
			}
	} 	

	$polaczenie->close();	
	echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?>