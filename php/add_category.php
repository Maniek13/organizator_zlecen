<?php
try{
	require_once "connection.php";
	$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

	if ($polaczenie->connect_errno!=0) 
	{
	$status =  "Błąd: ".$polaczenie->connect_errno;
	}
	else
	{
		$url_components = parse_url($_SERVER['REQUEST_URI']); 
		parse_str($url_components['query'], $params); 

		$kategoria  = $params['kategoria'];

		if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŻŹ0-9. -]+$/', $kategoria) == false ){
				echo json_encode("Proszę wpisać nazwę"); die();
		}


		$sql = "SELECT * FROM taskCategory";


		if($wynik = $polaczenie->query($sql)){
			$ilosc = $wynik->num_rows;
			$id = $ilosc + 1;

			$wynik=$wynik->fetch_all();

			if($ilosc-1 >= 0 && $id <= $wynik[$ilosc-1] ){
				for($i = 0; $i<$ilosc; $i++){
					if($wynik[$i][0] !=  $i+1){
						$id = $i+1;
						break;
					}
				}
			}
		}
		else{
			$status = "Błąd polaczenia";
		}
		
		$sql = "INSERT INTO taskCategory (categoryId, category) VALUES ('$id', '$kategoria')";

		if($polaczenie->query($sql)){
				$status = "1";
		}
		else{
				$status = "błąd przy dodawaniu do bazy";
		}
	}

	$polaczenie->close();	
	echo json_encode($status);

}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}

?>